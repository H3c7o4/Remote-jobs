export interface ApiError {
    response?: {
      data?: {
        message?: string;
        detail?: string;
        errors?: Record<string, string[]>;
      };
      status?: number;
    };
  }