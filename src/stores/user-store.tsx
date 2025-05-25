import { ApiUser, ApiUsersResponse, GetUsersParams } from "@/types/api-user";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { userApiService } from "@/services/user-api.service";

interface UserState {
  users: ApiUser[];
  total: number;
  page: number;
  size: number;
  pages: number;
  isLoading: boolean;
  error: string | null;
  hasInitialized: boolean;
}

interface UserActions {
  fetchUsers: (params?: GetUsersParams) => Promise<void>;
  reset: () => void;
  setError: (error: string | null) => void;
}

type UserStore = UserState & UserActions;

const initialState: UserState = {
  users: [],
  total: 0,
  page: 1,
  size: 10,
  pages: 0,
  isLoading: false,
  error: null,
  hasInitialized: false,
};

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchUsers: async (params?: GetUsersParams) => {
        const { hasInitialized, isLoading } = get();

        if (isLoading) return;

        if (hasInitialized && !params) return;

        set({ isLoading: true, error: null });

        try {
          const response: ApiUsersResponse = await userApiService.getUsers(
            params
          );

          set({
            users: response.users,
            total: response.total,
            page: response.page,
            size: response.size,
            pages: response.pages,
            isLoading: false,
            hasInitialized: true,
            error: null,
          });

          console.log("Users fetched successfully:", {
            total: response.total,
            page: response.page,
            usersCount: response.users.length,
            users: response.users,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";

          set({
            isLoading: false,
            error: errorMessage,
          });

          console.error("Failed to fetch users:", error);
        }
      },

      reset: () => {
        set(initialState);
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: "user-store",
    }
  )
);
