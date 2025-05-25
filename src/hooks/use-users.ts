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
    getUserById,
    updateUser,
    deleteUser,
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

  const handleUpdateUser = async (
    id: number,
    userData: Partial<CreateUserRequest>
  ) => {
    return await updateUser(id, userData);
  };

  const handleDeleteUser = async (id: number) => {
    return await deleteUser(id);
  };

  const handleGetUserById = async (id: number) => {
    return await getUserById(id);
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
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    getUserById: handleGetUserById,
    reset,
  };
};
