export interface UserProfileModel {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  role: string;
}

export interface PaginatedUsersResponse {
  content: UserProfileModel[]; 
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
