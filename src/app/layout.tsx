import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '~/app/components/Navbar'; // Corrected import path
import {
  ClerkProvider,
} from '@clerk/nextjs'
import '~/styles/globals.css';

export const metadata: Metadata = {
  title: "RedJacks - Live Music Mayhem",
  description: "Brought to you by Red and Jack, your purveyors of punk, rock, and all things loud!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
         
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
