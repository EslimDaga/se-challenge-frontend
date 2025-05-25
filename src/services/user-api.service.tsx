import { ApiUsersResponse, GetUsersParams } from "@/types/api-user";

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
}

export const userApiService = new UserApiService();
