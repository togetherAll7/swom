'use client';
import './globals.css';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { StateProvider } from '@/context/StateContext';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );

  const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
  };

  return (
    <html lang="en">
      <StateProvider>
        <Elements
          stripe={stripePromise}
          // options={options}
        >
          <body className="relative">
            <Navigation />
            {children}
            <Footer />
            <Script src="https://player.vimeo.com/api/player.js"></Script>
          </body>
        </Elements>
      </StateProvider>
    </html>
  );
}
