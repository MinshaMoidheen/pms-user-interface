"use client";

import React from 'react';
import PropertyDetail from '@/components/For-Sale/PropertyDetail';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const PropertyPage = ({ params }: PageProps) => {
    const { id } = React.use(params);
    return <PropertyDetail id={id} />;
};

export default PropertyPage;
