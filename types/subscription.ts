

export type SubscriptionType = 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

export interface ISubscriptionPlan {
    _id: string;
  name: string;
  type: SubscriptionType;
  description: string;
  price: number;
  currency: string;
  duration: number; // in days
  features: {
    ensuredInterviewCalls: boolean; // Guaranteed interview calls
    priorityApplication: boolean; // Applications shown first to employers
    unlimitedApplications: boolean; // No limit on job applications
    cvVisibility: boolean; // CV visible to all employers
    featuredProfile: boolean; // Profile featured in search
    directEmployerContact: boolean; // Can contact employers directly
    interviewScheduling: boolean; // Can schedule interviews directly
    analytics: boolean; // Access to application analytics
    support: string; // Support level: 'BASIC', 'PRIORITY', 'DEDICATED'
  };
  isActive: boolean; // Plan availability status
  createdBy?: string; // User who created
  updatedBy?: string; // User who last updated
  isDeleted: {
    status: boolean;
    deletedBy?: string;
    deletedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface getSubscriptionPlansResponse {
    success: boolean;
    message: string;
    data: {
        plans: ISubscriptionPlan[];
    };
}


export type UserSubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING_PAYMENT';

export interface IUserSubscription {
  _id: string;
  user: string;
  subscriptionPlan: ISubscriptionPlan;
  subscriptionType: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  createdBy: string; // User who created
  updatedBy?: string; // User who last updated
  status: UserSubscriptionStatus;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentId?: string; // Payment gateway transaction ID
  paymentAmount: number;
  paymentCurrency: string;
  paymentDate?: Date;
  cancelledAt?: Date;
  cancelledBy?: string;
  cancellationReason?: string;
  // Track usage
  interviewCallsUsed: number; // Number of ensured interview calls used
  applicationsCount: number; // Number of applications made during subscription
  isDeleted: {
    status: boolean;
    deletedBy?: string;
    deletedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface getUserSubscriptionsResponse {
    success: boolean;
    message: string;
    data: {
        subscriptions: IUserSubscription[];
        pagination: {
        page: number,
        limit: number,
        total: number,
        pages: number,
      },
    }
}

export interface activateSubscriptionResponse {
    success: boolean;
    message: string;
    data: {
        subscription: ISubscriptionPlan;
    };
}

export interface activateSubscriptionRequest {
    subscriptionId: string;
    paymentId: string;
}

export interface cancelSubscriptionResponse {
    success: boolean;
    message: string;
    data: {
        subscription: ISubscriptionPlan;
    };
}

export interface cancelSubscriptionRequest {
    subscriptionId: string;
    reason: string;
}