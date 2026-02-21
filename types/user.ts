export interface IUser {
  _id: string;
  mobileNumber?: string; // Optional for social auth users
  role: 'SUPER_ADMIN' | 'BROKER' | 'USER';
  isMobileVerified: boolean;
  isActive: boolean; // Account status (active/inactive)
  createdBy?: string; // User who created (for admin-created users)
  updatedBy?: string; // User who last updated
  isDeleted: {
    status: boolean;
    deletedBy?: string;
    deletedAt?: Date;
  };
  profile: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    // Job application profile fields
    cv?: string; // URL to CV file
    resume?: string; // URL to resume file
    experience?: {
      years?: number;
      months?: number;
      description?: string;
    };
    education?: {
      degree?: string;
      field?: string;
      institution?: string;
      year?: number;
    };
    skills?: string[];
    currentLocation?: {
      city?: string;
      state?: string;
    };
    expectedSalary?: {
      min?: number;
      max?: number;
      currency?: string;
    };
  };
  socialAuth?: {
    googleId?: string;
    facebookId?: string;
    googleEmail?: string;
    facebookEmail?: string;
  };
  lastLogin?: Date;
  refreshTokens: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface getProfileResponse {
  success: boolean;
  message: string;
  data: IUser;
}