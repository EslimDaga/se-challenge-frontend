import { ApiUser, ApiUsersResponse, GetUsersParams } from "@/types/api-user";

import { CreateUserRequest } from "@/types/user";

class UserApiService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

    if (!this.baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_BASE_URL environment variable is not defined"
      );
    }
  }

  async getUsers(params: GetUsersParams = {}): Promise<ApiUsersResponse> {
    const { page = 1, size = 10, active_only = true } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      active_only: active_only.toString(),
    });

    const url = `${this.baseUrl}/users/?${searchParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: ApiUsersResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async createUser(userData: CreateUserRequest): Promise<ApiUser> {
    const url = `${this.baseUrl}/users/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail ||
            `API Error: ${response.status} ${response.statusText}`
        );
      }

      const data: ApiUser = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

export const userApiService = new UserApiService();
