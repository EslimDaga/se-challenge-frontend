import { ApiUser } from "./api-user";

export interface UserTableData {
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

export interface TableFilters {
  status: "all" | "active" | "inactive";
}

export interface TablePagination {
  page: number;
  size: number;
  total: number;
  pages: number;
}

export const mapApiUserToTableData = (apiUser: ApiUser): UserTableData => ({
  id: apiUser.id,
  username: apiUser.username,
  email: apiUser.email,
  first_name: apiUser.first_name,
  last_name: apiUser.last_name,
  role: apiUser.role,
  active: apiUser.active,
  created_at: apiUser.created_at,
  updated_at: apiUser.updated_at,
});
