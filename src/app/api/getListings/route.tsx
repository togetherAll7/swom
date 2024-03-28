import { NextResponse } from 'next/server';
import { sanityClient } from '../../../../sanity/lib/client';
import Stripe from 'stripe';
import { supabaseClient } from '@/utils/supabaseClient';
import { Client } from '@googlemaps/google-maps-services-js';

export async function POST(req: Request, res: Response) {
  const supabase = supabaseClient();
  const body = await req.json();
  const id = body.userId;
  const query = body.query;
  const googleMapsClient = new Client({});

  if (id && !query) {
    const data = await sanityClient.fetch(
      `*[_type == 'user' && _id == $id][0]`,
      { id }
    );

    if (!data) {
      console.error('No data found');
      return NextResponse.error();
    }

    return NextResponse.json(data);
  } else {
    let listings = await sanityClient.fetch(query);

    let updatedListings = await Promise.all(
      listings &&
        listings.map(async (listing: any) => {
          // Skip geocoding if lat or lng is null
          console.log('Listing:', listing.homeInfo.address);

          const { lat, lng } = listing.homeInfo.address; // Adjust according to your data structure

          try {
            const response = await googleMapsClient.geocode({
              params: {
                latlng: `${lat},${lng}`,
                // @ts-ignore
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
              },
            });
            const results = response.data.results[0];
            if (results) {
              const addressComponents = results.address_components;
              let city = '',
                country = '';

              for (const component of addressComponents) {
                // @ts-ignore
                if (component.types.includes('locality')) {
                  city = component.long_name;
                  // @ts-ignore
                } else if (component.types.includes('country')) {
                  country = component.long_name;
                }
              }

              return { ...listing, city, country };
            }
            return listing;
          } catch (error) {
            console.error('Reverse geocoding failed:', error);
            return listing; // Return original listing if geocoding fails
          }
        })
    );

    const { data: user, error: userError } = await supabase
      .from('appUsers')
      .select('favorites')
      .eq('id', id);

    if (userError) {
      console.error('Error fetching user favorites:', userError);
    } else if (user && user[0].favorites.length > 0 && !userError) {
      const favoriteEmails = user[0].favorites.map((fav: any) => fav.listingId); // Extract listingId values into an array
      updatedListings = updatedListings.map((listing: any) => ({
        ...listing,
        favorite: favoriteEmails.includes(listing.userInfo.email), // Check against array of favorite emails
      }));
    }

    if (!updatedListings) {
      console.error('No data found');
      return NextResponse.error();
    }

    return NextResponse.json(updatedListings);
  }
}
