import React from 'react';
import PlaceholderComponent from '../../components/PlaceholderComponent';

const ManageBookings = () => {
  return (
    <PlaceholderComponent
      title="Manage Bookings"
      description="This page will allow field owners to view, approve, reject, and manage all bookings for their football fields."
      linkTo="/dashboard"
      linkText="Back to Dashboard"
    />
  );
};

export default ManageBookings;
