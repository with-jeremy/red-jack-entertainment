"use client";

import React from 'react';
import Button from './ui/Button';

const AdminDashboard = () => {
  return (
    <div className="bg-black text-silver p-4">
      <h2 className="text-2xl font-bold uppercase tracking-wider">RedJacks Admin</h2>
      <p className="text-sm mt-2">Manage your events here. Coming soon!</p>
      <div className="mt-4 flex gap-4">
        <Button onClick={() => alert('Create Event')}>Create an Event</Button>
        <Button onClick={() => alert('Show Events')}>Show Events</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;