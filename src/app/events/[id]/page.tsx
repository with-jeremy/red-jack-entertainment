import React from 'react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
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

interface Params {
    id: string;
}

interface PageProps {
    params: Params;
}

export default function EventDetailPage({ params }: PageProps) {
    const { id } = params;  // Access the 'id' parameter
    // ... rest of your component logic, using the 'id' to fetch data
    return (
      <div>
        <h1>Event ID: {id}</h1>
      </div>
    );
  }