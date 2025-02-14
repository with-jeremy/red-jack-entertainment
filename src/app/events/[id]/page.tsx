import React from 'react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import axios from 'axios';

interface Event {
    id: string;
    name: string;
    date: string;
    time: string;
    description: string;
    imageUrl: string;
    ticketPrice: number;
}

interface Params {
    id: string;
}

interface PageProps {
    params: Params;
}

async function getEvent(id: string): Promise<Event | undefined> {
    try {
        const response = await axios.get('/data/events.json');
        const eventData: Event[] = response.data;
        return eventData.find((event) => event.id === id);
    } catch (error) {
        console.error('Error fetching event:', error);
        return undefined;
    }
}

export default async function EventDetails({ params }: PageProps) {
    const { id } = params;
    const event = await getEvent(id);

    if (!event) {
        notFound(); // Next.js function to return a 404
    }

    return (
        <div className="p-4">
            <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img
                            className="h-48 w-full object-cover md:h-full md:w-48"
                            src={event.imageUrl}
                            alt={event.name}
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-red-500 font-semibold">{event.name}</div>
                        <p className="mt-2 text-gray-400">{event.description}</p>
                        <p className="mt-2 text-gray-400">
                            {format(new Date(event.date), 'MMMM dd, yyyy')} - {event.time}
                        </p>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 uppercase tracking-wider">
                            Get Tickets - ${event.ticketPrice}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}