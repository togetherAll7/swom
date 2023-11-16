'use client';
import React, { useState, useEffect } from 'react';

import { supabaseClient } from '@/utils/supabaseClient';

interface Listing {
  user_id: number;
  city: string;
  created_at: string;
  homeInfo: {
    address: string;
  };
  userInfo: {
    email: string;
    name: string;
  };
  amenities: object;
}

const Dashboard: React.FC = () => {
  const [needsApprovalListings, setNeedsApprovalListings] = useState<Listing[]>(
    []
  );
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const supabase = supabaseClient();

  useEffect(() => {
    // Fetch listings that need approval from the 'needs_approval' table
    const fetchNeedsApprovalListings = async () => {
      try {
        const { data, error } = await supabase
          .from('needs_approval')
          .select('*');
        if (error) {
          console.error('Error fetching listings:', error.message);
        } else {
          console.log('data', data);
          setNeedsApprovalListings(data ?? []);
        }
      } catch (error: any) {
        console.error('Error fetching listings:', error.message);
      }
    };

    fetchNeedsApprovalListings();
  }, []);

  const handleReject = async (listingObj: any) => {
    try {
      // Move the listing to the 'rejected_listings' table
      const { data, error } = await supabase
        .from('needs_approval')
        .delete()
        .eq('user_id', listingObj.user_id);

      if (error) {
        console.error('Error rejecting listing:', error.message);
      } else {
        // Add the rejected listing to the 'rejected_listings' table
        const { data: listingUpdate, error: updateError } = await supabase
          .from('rejected_listings')
          .insert({
            user_id: listingObj.user_id,
            userInfo: listingObj.userInfo,
            homeInfo: listingObj.homeInfo,
            city: listingObj.city,
            amenities: listingObj.amenities,
          });
        if (updateError) {
          console.error('Error approving listing:', updateError.message);
        } else {
          console.log('listingData', listingUpdate);
          // Remove the listing from the local state
          setNeedsApprovalListings(
            needsApprovalListings.filter(
              (listing) => listing.user_id !== listingObj.user_id
            )
          );
        }
      }
    } catch (error: any) {
      console.error('Error rejecting listing:', error.message);
    }
  };

  const handleApprove = async (listingObj: any) => {
    try {
      // Move the listing to the 'listings' table
      const { data, error } = await supabase
        .from('needs_approval')
        .delete()
        .eq('user_id', listingObj.user_id);

      if (error) {
        console.error('Error approving listing:', error.message);
      } else {
        console.log('data', data);
        // Add the approved listing to the 'listings' table
        const { data: listingUpdate, error } = await supabase
          .from('listings')
          .insert({
            user_id: listingObj.user_id,
            userInfo: listingObj.userInfo,
            homeInfo: listingObj.homeInfo,
            city: listingObj.city,
            amenities: listingObj.amenities,
          });
        if (error) {
          console.error('Error approving listing:', error.message);
        } else {
          console.log('data', listingUpdate);
          // Remove the listing from the local state
          setNeedsApprovalListings(
            needsApprovalListings.filter(
              (listing) => listing.user_id !== listingObj.user_id
            )
          );
        }
      }
    } catch (error: any) {
      console.error('Error approving listing:', error.message);
    }
  };

  const handleView = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const handleClosePopup = () => {
    setSelectedListing(null);
  };

  return (
    <div className=" w-full overflow-scroll md:w-2/3 m-auto min-h-screen">
      <h1 className="text-xl text-center my-4">Listings Needing Approval</h1>
      <table className="w-[500px] md:w-full h-fit">
        <thead>
          <tr>
            <th>User</th>
            <th>Address</th>
            <th>View</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center   my-2 border-2 ">
          {needsApprovalListings.map((listing) => (
            <tr key={listing.user_id} className="">
              <td className="py-4">{listing.userInfo.name}</td>
              <td className="py-4">{listing.homeInfo.address}</td>
              <td className="py-4">
                <button
                  onClick={() => {
                    handleView(listing);
                  }}>
                  {/* unicode for eye */}
                  &#128065;
                </button>
              </td>
              <td className="flex py-4 align-middle  justify-evenly">
                <button onClick={() => handleReject(listing)}>
                  {/* unicode for x */}
                  &#10005;
                </button>
                <button onClick={() => handleApprove(listing)}>
                  {/* unicode for checkmark */}
                  &#10003;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedListing && (
        <div className="fixed inset-0 px-2  bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white md:w-2/3 p-4  m-auto overflow-y-scroll">
            <div className="flex md:flex-row flex-col md:text-center border-b border-gray-600 text-lg justify-evenly my-2">
              <p>
                User: <br /> {selectedListing.userInfo.name}
              </p>
              <p>
                Email: <br /> {selectedListing.userInfo.email}
              </p>
              <p>
                Address: <br /> {selectedListing.homeInfo.address}
              </p>
            </div>
            <div className="flex  m-auto md:justify-evenly flex-wrap">
              <div>
                <p className="mt-2 text-lg">Home Information:</p>
                <ul className="">
                  {Object.entries(selectedListing.homeInfo).map(
                    ([key, value]) => (
                      <li key={key} className="capitalize">
                        {key}: {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <p className="mt-2 text-lg">Amenities:</p>
                <ul>
                  {Object.entries(selectedListing.amenities).map(
                    ([key, value]) => {
                      return value ? (
                        <li key={key} className="capitalize">
                          {key}: {value ? 'Yes' : 'No'}
                        </li>
                      ) : null;
                    }
                  )}
                </ul>
              </div>
              <div>
                <p className="mt-2 text-lg">User Information:</p>
                <ul>
                  {Object.entries(selectedListing.userInfo).map(
                    ([key, value]) => (
                      <li
                        key={key}
                        className={key !== 'email' ? 'capitalize' : ''}>
                        {key}: {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <button
              className="m-auto flex my-4 w-fit"
              onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
