export interface ApiUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "admin" | "user" | "moderator";
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiUsersResponse {
  users: ApiUser[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface GetUsersParams {
  page?: number;
  size?: number;
  active_only?: boolean;
}
