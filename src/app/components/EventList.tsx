"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { format } from 'date-fns';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  imageUrl: string;
  ticketPrice: number;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/data/events.json');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ul className="divide-y divide-gray-700">
      {events.map((event) => (
        <li key={event.id} className="py-4">
          <Link href={`/events/${event.id}`} passHref className="flex items-center space-x-4 hover:text-red-500 transition-colors duration-200">
              <img
                className="w-12 h-12 rounded-full"
                src={event.imageUrl}
                alt={event.name}
              />
              <div className="space-y-1">
                <p className="text-lg font-medium text-silver uppercase tracking-wider">{event.name}</p>
                <p className="text-sm text-gray-400">{format(new Date(event.date), 'MMMM dd, yyyy')}</p>
              </div>
            
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EventList;