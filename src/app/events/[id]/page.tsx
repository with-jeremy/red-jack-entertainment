import React from 'react';
import { EventDetail } from './EventDetail';

interface Params {
    id: string;
}

interface PageProps {
    params: Params;
}

export default function EventPage({ params }: PageProps) {
    const { id } = params;

    return (
        <div>
            <EventDetail eventId={id} />
        </div>
    );
}