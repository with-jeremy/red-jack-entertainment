import type { NextPage } from 'next';
import EventList from '~/app/components/EventList'; // Corrected import path

const Home: NextPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold uppercase tracking-wider mb-4 text-red-500">
        RedJacks - Live Music Mayhem
      </h1>
      <p className="text-gray-400 mb-4">
        Brought to you by Red and Jack, your purveyors of punk, rock, and all things loud!
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold uppercase tracking-wider mb-2">Location</h2>
        <p className="text-gray-300">123 Anarchy Avenue, Rock City, USA</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold uppercase tracking-wider mb-2">Contact</h2>
        <p className="text-gray-300">Email: info@redjacks.com</p>
        <p className="text-gray-300">Phone: 555-RIP-EARS</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold uppercase tracking-wider mb-2">Featured Events</h2>
        <EventList />
      </div>
    </div>
  );
};

export default Home;