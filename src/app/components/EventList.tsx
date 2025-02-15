"use client";
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Link from 'next/link';
import { format, parseISO, isValid } from 'date-fns';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  imageUrl: string;
  ticketPrice: number;
}

// Type guard function to check if an object is an Event
function isEvent(obj: any): obj is Event {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.time === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.imageUrl === 'string' &&
    typeof obj.ticketPrice === 'number'
  );
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const baseURL = '/data/events.json';
        const response: AxiosResponse<unknown> = await axios.get(baseURL); // Use 'unknown'

        if (Array.isArray(response.data)) {
            const potentialEvents: unknown[] = response.data; // Assign to unknown[] first

            const validatedEvents: Event[] = potentialEvents.filter((item): item is Event => isEvent(item)); // Type predicate in filter

            if (validatedEvents.length !== response.data.length) {
                console.warn("Some event data was invalid and filtered out.");
            }

            setEvents(validatedEvents);
        } else {
          console.error("Error: events.json does not contain an array");
        }


      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching events:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    };

    void fetchEvents();
  }, []);

  return (
    <ul className="divide-y divide-gray-700">
      {events.map((event) => {
        const parsedDate = parseISO(event.date); // Parse here
        const formattedDate = isValid(parsedDate) ? format(parsedDate, 'MMMM dd, yyyy') : 'Invalid Date';

        return (
        <li key={event.id} className="py-4">
          <Link href={`/events/${event.id}`} passHref className="flex items-center space-x-4 hover:text-red-500 transition-colors duration-200">
              <img
                className="w-12 h-12 rounded-full"
                src={event.imageUrl}
                alt={event.name}
              />
              <div className="space-y-1">
                <p className="text-lg font-medium text-silver uppercase tracking-wider">{event.name}</p>
                {/* Display formatted date or "Invalid Date" */}
                <p className="text-sm text-gray-400">{formattedDate}</p>
              </div>

          </Link>
        </li>
      )})}
    </ul>
  );
};

export default EventList;