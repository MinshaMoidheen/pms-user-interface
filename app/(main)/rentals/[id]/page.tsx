"use client";

import React from 'react';
import RentalDetail from '@/components/Rentals/RentalDetail';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const PropertyPage = ({ params }: PageProps) => {
    const { id } = React.use(params);
    return <RentalDetail id={id} />;
};

export default PropertyPage;
