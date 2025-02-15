import React from 'react';
import Link from 'next/link';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-red-500 text-2xl font-bold uppercase tracking-wider">
          RedJacks
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-red-500 transition-colors duration-200">
            Home
          </Link>
          {process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true' && (
            <Link href="/admin" className="text-gray-300 hover:text-red-500 transition-colors duration-200">
              Admin
            </Link>
          )}
        </div>
        <div className="space-x-4 text-gray-300">
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;