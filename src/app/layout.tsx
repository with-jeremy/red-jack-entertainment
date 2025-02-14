import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '~/app/components/Navbar'; // Corrected import path
import '~/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "RedJack's - Live Music Mayhem",
  description: "Brought to you by Red and Jack, your purveyors of punk, rock, and all things loud!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-silver min-h-screen`}>
        <Navbar />
        <main className="container mx-auto py-8">
          {children}
        </main>
      </body>
    </html>
  );
}