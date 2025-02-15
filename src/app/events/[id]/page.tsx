import React from 'react';
import { EventDetail } from './EventDetail';

interface Params {
    id?: string;
}

interface PageProps {
    params?: Params;
}

export default function EventPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <div>
            <EventDetail eventId={id} />
        </div>
    );
}