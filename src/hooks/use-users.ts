import { CreateUserRequest } from "@/types/user";
import { GetUsersParams } from "@/types/api-user";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";

export const useUsers = (
  autoFetch: boolean = true,
  params?: GetUsersParams
) => {
  const {
    users,
    total,
    page,
    size,
    pages,
    isLoading,
    error,
    hasInitialized,
    isCreating,
    createError,
    fetchUsers,
    createUser,
    reset,
  } = useUserStore();

  useEffect(() => {
    if (autoFetch && !hasInitialized) {
      fetchUsers(params);
    }
  }, [autoFetch, hasInitialized, fetchUsers, params]);

  const handleCreateUser = async (userData: CreateUserRequest) => {
    return await createUser(userData);
  };

  return {
    users,
    total,
    page,
    size,
    pages,
    isLoading,
    error,
    hasInitialized,
    isCreating,
    createError,
    fetchUsers,
    createUser: handleCreateUser,
    reset,
  };
};
