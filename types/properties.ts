import { IUser } from "./user";

export type PropertyType = "SALE" | "RENT";
export type PropertyCategory =
  | "HOUSE_VILLA"
  | "APARTMENT"
  | "STUDIO"
  | " "
  | "COMMERCIAL_BUILDING"
  | "COMMERCIAL_PROJECT"
  | "COWORKING_SPACE"
  | "SHOP_ROOM";

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
  // Flexible amenities list (e.g. "Free Wifi", "Air conditioning")
  amenities: string[];
  // Flexible validated info key-value pairs (e.g. Developer, Ownership, Usage)
  validatedInfo: {
    _id: string;
    label: string;
    value: string;
  }[];
  // Users who bookmarked this property
  bookmarks: string[];
  images: string[]; // URLs to images
  contact: {
    name: string;
    mobileNumber: string;
    email?: string;
    whatsappNumber: string;
  };
  postedBy: IUser; // User who posted
  createdBy: string; // User who created
  updatedBy?: string; // User who last updated
  isDeleted: {
    status: boolean;
    deletedBy?: string;
    deletedAt?: Date;
  };
  isFeatured: boolean;
  views: number;
  averageRating: number; // Cached average rating (1-5), updated after every review
  reviewCount: number; // Cached total review count, updated after every review
  createdAt: Date;
  updatedAt: Date;
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

export interface getPropertyByIdResponse {
  success: boolean;
  message: string;
  data: {
    property: IProperty;
  };
}

export interface getSimilarPropertiesResponse {
  success: boolean;
  message: string;
  data: {
    properties: IProperty[];
  };
}


export interface toggleBookmarkResponse {
  success: boolean;
  message: string;
  data: {
    isBookmarked: boolean;
    bookmarksCount: number;
  }
}