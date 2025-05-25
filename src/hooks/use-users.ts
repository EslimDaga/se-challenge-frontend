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
    fetchUsers,
    reset,
  } = useUserStore();

  useEffect(() => {
    if (autoFetch && !hasInitialized) {
      fetchUsers(params);
    }
  }, [autoFetch, hasInitialized, fetchUsers, params]);

  return {
    users,
    total,
    page,
    size,
    pages,
    isLoading,
    error,
    hasInitialized,
    fetchUsers,
    reset,
  };
};
