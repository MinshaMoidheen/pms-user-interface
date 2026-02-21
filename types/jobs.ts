export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "FREELANCE"
  | "INTERNSHIP";

export interface IJobPost {
  _id: string;
  title: string;
  description: string;
  companyName: string;
  employmentType: EmploymentType;
  location: {
    city: string;
    state: string;
    address?: string;
  };
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: string; // 'per month', 'per year', etc.
  };
  requirements: string[]; // Skills, qualifications, etc.
  responsibilities: string[];
  contact: {
    name: string;
    mobileNumber: string;
    email?: string;
    whatsappNumber: string;
  };
  postedBy: string; // Employer (User with BROKER or SUPER_ADMIN role)
  createdBy: string; // User who created
  updatedBy?: string; // User who last updated
  views: number;
  applicationCount: number;
  isDeleted: {
    status: boolean;
    deletedBy?: string;
    deletedAt?: Date;
  };
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface getJobPostsResponse {
  success: boolean;
  message: string;
  data: {
    jobs: IJobPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface getJobPostByIdResponse {
  success: boolean;
  message: string;
  data: {
    job: IJobPost;
  };
}
