"use client";
import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { format, parseISO, isValid } from 'date-fns';
import axios, { AxiosResponse } from 'axios';

interface Event {
    id: string;
    name: string;
    date: string;
    time: string;
    description: string;
    imageUrl: string;
    ticketPrice: number;
}

interface EventDetailProps {
    eventId: string;
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

export const EventDetail: React.FC<EventDetailProps> = ({ eventId }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const baseURL = '/data/events.json';
                const response: AxiosResponse<unknown> = await axios.get(baseURL);

                if (Array.isArray(response.data)) {
                    const potentialEvents: unknown[] = response.data;

                    const validatedEvents: Event[] = potentialEvents.filter((item): item is Event => isEvent(item));

                    const foundEvent = validatedEvents.find((e) => e.id === eventId);

                    if (foundEvent) {
                        setEvent(foundEvent);
                    } else {
                        notFound();
                    }
                } else {
                    console.error("Error: events.json does not contain an array");
                    setError("Failed to load event data.");
                }
            } catch (err) {
                if (err instanceof Error) {
                    console.error('Error fetching event:', err.message);
                    setError('Failed to load event data.');
                } else {
                    console.error('An unexpected error occurred:', err);
                    setError('Failed to load event data.');
                }
            } finally {
                setLoading(false);
            }
        };

        void fetchEvent();
    }, [eventId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!event) {
        return <p>Event not found.</p>;
    }

     // Parse the date string into a Date object
     const parsedDate = parseISO(event.date);

     // Format the date if it's valid
     const formattedDate = isValid(parsedDate) ? format(parsedDate, 'MMMM dd, yyyy') : 'Invalid Date';

    return (
        <div>
            <h1>{event.name}</h1>
            <p>Date: {formattedDate}</p>
            <p>Time: {event.time}</p>
            <p>Description: {event.description}</p>
            <p>Ticket Price: ${event.ticketPrice}</p>
            <img src={event.imageUrl} alt={event.name} />
        </div>
    );
};
