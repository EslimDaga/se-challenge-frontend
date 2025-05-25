import {
  TableFilters,
  UserTableData,
  mapApiUserToTableData,
} from "@/types/user-table";
import { useCallback, useMemo, useState } from "react";

import { SortingState } from "@tanstack/react-table";
import { useUserStore } from "@/stores/user-store";

export const useUserTable = () => {
  const { users, isLoading, error, fetchUsers } = useUserStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState<TableFilters>({ status: "all" });
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tableData: UserTableData[] = useMemo(() => {
    return users.map(mapApiUserToTableData);
  }, [users]);

  const filteredData = useMemo(() => {
    return tableData.filter((user) => {
      switch (filters.status) {
        case "active":
          return user.active;
        case "inactive":
          return !user.active;
        default:
          return true;
      }
    });
  }, [tableData, filters.status]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const paginationInfo = useMemo(() => {
    const totalFiltered = filteredData.length;
    const pages = Math.ceil(totalFiltered / pageSize);

    return {
      page: currentPage,
      size: pageSize,
      total: totalFiltered,
      pages,
      hasNext: currentPage < pages,
      hasPrev: currentPage > 1,
    };
  }, [filteredData.length, pageSize, currentPage]);

  const handleFilterChange = useCallback(
    (newFilters: Partial<TableFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      setCurrentPage(1);
    },
    []
  );

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSortingChange = useCallback(
    (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
      setSorting(updaterOrValue);
    },
    []
  );

  const handleRowSelectionChange = useCallback(
    (
      updaterOrValue:
        | Record<string, boolean>
        | ((old: Record<string, boolean>) => Record<string, boolean>)
    ) => {
      setSelectedRows(updaterOrValue);
    },
    []
  );

  const refetchUsers = useCallback(() => {
    fetchUsers({ page: 1, size: 100 });
  }, [fetchUsers]);

  return {
    data: paginatedData,
    filteredData,
    allData: tableData,
    sorting,
    selectedRows,
    filters,
    isLoading,
    error,
    pagination: paginationInfo,
    setSorting: handleSortingChange,
    setSelectedRows: handleRowSelectionChange,
    setFilters: handleFilterChange,
    setPageSize: handlePageSizeChange,
    setCurrentPage: handlePageChange,
    refetchUsers,
  };
};
