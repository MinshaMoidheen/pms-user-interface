export type PropertyType = 'SALE' | 'RENT';
export type PropertyCategory = 
  | 'HOUSE_VILLA' 
  | 'APARTMENT' 
  | 'STUDIO' 
  | 'PG' 
  | 'COMMERCIAL_BUILDING' 
  | 'COMMERCIAL_PROJECT'
  | 'COWORKING_SPACE'
  | 'SHOP_ROOM';


export interface IProperty {
    _id: string;
  type: PropertyType; // SALE or RENT
  category: PropertyCategory;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  price: number;
  priceUnit?: string; // e.g., 'Lakhs', 'Crores', 'per month'
  area: {
    value: number;
    unit: string; // 'sqft', 'sqm', 'sqyd'
  };
  // Flexible fields stored as key-value pairs
  flexibleFields: {
    [key: string]: any; // e.g., bedrooms, bathrooms, floors, parking, etc.
  };
  images: string[]; // URLs to images
  contact: {
    name: string;
    mobileNumber: string;
    email?: string;
    whatsappNumber: string;
  };
  postedBy: string; // User who posted
  createdBy: string; // User who created
  updatedBy?: string; // User who last updated
  isDeleted: {
    status: boolean;
    deletedBy?: string;
    deletedAt?: Date;
  };
  isFeatured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface getPropertiesParams {
     type: PropertyType;
     category: PropertyCategory;
     city: string;
     state: string;
     minPrice: string;
     maxPrice: string;
     search: string;
     page: number;
     limit: number;
}

export interface getPropertiesResponse {
    success: boolean;
    message: string;
    data: {
        properties: IProperty[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}