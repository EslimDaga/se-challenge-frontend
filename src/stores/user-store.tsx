import { ApiUser, ApiUsersResponse, GetUsersParams } from "@/types/api-user";

import { CreateUserRequest } from "@/types/user";
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
  isCreating: boolean;
  createError: string | null;
}

interface UserActions {
  fetchUsers: (params?: GetUsersParams) => Promise<void>;
  createUser: (userData: CreateUserRequest) => Promise<ApiUser>;
  getUserById: (id: number) => Promise<ApiUser>;
  updateUser: (
    id: number,
    userData: Partial<CreateUserRequest>
  ) => Promise<ApiUser>;
  deleteUser: (id: number) => Promise<void>;
  reset: () => void;
  setError: (error: string | null) => void;
  setCreateError: (error: string | null) => void;
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
  isCreating: false,
  createError: null,
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

      createUser: async (userData: CreateUserRequest) => {
        set({ isCreating: true, createError: null });

        try {
          const newUser = await userApiService.createUser(userData);

          const { users, total } = get();
          set({
            users: [newUser, ...users],
            total: total + 1,
            isCreating: false,
            createError: null,
          });

          console.log("User created successfully:", newUser);
          return newUser;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";

          set({
            isCreating: false,
            createError: errorMessage,
          });

          console.error("Failed to create user:", error);
          throw error;
        }
      },

      getUserById: async (id: number) => {
        try {
          const user = await userApiService.getUserById(id);
          return user;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";

          set({ error: errorMessage });
          console.error("Failed to fetch user:", error);
          throw error;
        }
      },

      updateUser: async (id: number, userData: Partial<CreateUserRequest>) => {
        set({ isCreating: true, createError: null });

        try {
          const updatedUser = await userApiService.updateUser(id, userData);

          const { users } = get();
          const updatedUsers = users.map((user) =>
            user.id === id ? updatedUser : user
          );

          set({
            users: updatedUsers,
            isCreating: false,
          });

          return updatedUser;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";

          set({
            isCreating: false,
            createError: errorMessage,
          });

          console.error("Failed to update user:", error);
          throw error;
        }
      },

      deleteUser: async (id: number) => {
        try {
          await userApiService.deleteUser(id);

          const { users, total } = get();
          const updatedUsers = users.filter((user) => user.id !== id);

          set({
            users: updatedUsers,
            total: total - 1,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";

          set({ error: errorMessage });
          console.error("Failed to delete user:", error);
          throw error;
        }
      },

      reset: () => {
        set(initialState);
      },

      setError: (error: string | null) => {
        set({ error });
      },

      setCreateError: (error: string | null) => {
        set({ createError: error });
      },
    }),
    {
      name: "user-store",
    }
  )
);
