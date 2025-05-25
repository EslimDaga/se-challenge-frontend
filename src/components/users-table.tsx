"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Home,
  ChevronRight,
  MoreHorizontal,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import * as Breadcrumb from "@/components/ui/breadcrumb";
import * as Button from "@/components/ui/button";
import * as Checkbox from "@/components/ui/checkbox";
import * as Pagination from "@/components/ui/pagination";
import * as SegmentedControl from "@/components/ui/segmented-control";
import * as StatusBadge from "@/components/ui/status-badge";
import * as Table from "@/components/ui/table";

import { useUserTable } from "@/hooks/use-user-table";
import { UserTableData } from "@/types/user-table";

const getSortingIcon = (state: "asc" | "desc" | false) => {
  if (state === "asc") return <ArrowUp className="h-4 w-4" />;
  if (state === "desc") return <ArrowDown className="h-4 w-4" />;
  return <ArrowUpDown className="h-4 w-4" />;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const columns: ColumnDef<UserTableData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox.Root
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox.Root
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "user",
    accessorKey: "first_name",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Usuario
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="ml-1 hover:text-text-strong-950"
        >
          {getSortingIcon(column.getIsSorted())}
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-label-sm text-text-strong-950">
              {user.first_name} {user.last_name}
            </span>
            <span className="text-paragraph-xs text-text-sub-600">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "username",
    accessorKey: "username",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Nombre de Usuario
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="ml-1 hover:text-text-strong-950"
        >
          {getSortingIcon(column.getIsSorted())}
        </button>
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-label-sm text-text-strong-950">
        @{row.original.username}
      </span>
    ),
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Rol
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="ml-1 hover:text-text-strong-950"
        >
          {getSortingIcon(column.getIsSorted())}
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      const roleLabels = {
        admin: "Administrador",
        user: "Usuario",
        moderator: "Moderador",
      };

      return (
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
          {roleLabels[role]}
        </span>
      );
    },
  },
  {
    id: "status",
    accessorKey: "active",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Estado
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="ml-1 hover:text-text-strong-950"
        >
          {getSortingIcon(column.getIsSorted())}
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const isActive = row.original.active;
      return (
        <StatusBadge.Root status={isActive ? "completed" : "disabled"}>
          <StatusBadge.Icon as={isActive ? CheckCircle : XCircle} />
          {isActive ? "Activo" : "Inactivo"}
        </StatusBadge.Root>
      );
    },
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Fecha de Registro
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="ml-1 hover:text-text-strong-950"
        >
          {getSortingIcon(column.getIsSorted())}
        </button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-label-sm text-text-strong-950">
          {formatDate(row.original.created_at)}
        </span>
        <span className="text-paragraph-xs text-text-sub-600">
          Hace{" "}
          {Math.floor(
            (Date.now() - new Date(row.original.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          )}{" "}
          días
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <Button.Root variant="neutral" mode="ghost" size="xsmall">
        <Button.Icon as={MoreHorizontal} />
      </Button.Root>
    ),
  },
];

function TablePagination({
  pagination,
  onPageChange,
}: {
  pagination: ReturnType<typeof useUserTable>["pagination"];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) {
  const { page, pages, total, size, hasNext, hasPrev } = pagination;

  const pageNumbers = React.useMemo(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(pages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < pages - 1) {
      rangeWithDots.push("...", pages);
    } else if (pages > 1) {
      rangeWithDots.push(pages);
    }

    return rangeWithDots;
  }, [page, pages]);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="text-sm text-text-sub-600">
        Mostrando {Math.min((page - 1) * size + 1, total)} a{" "}
        {Math.min(page * size, total)} de {total} resultados
      </div>

      <Pagination.Root>
        <Pagination.NavButton
          disabled={!hasPrev}
          onClick={() => onPageChange(1)}
        >
          <Pagination.NavIcon as={ChevronsLeft} />
        </Pagination.NavButton>

        <Pagination.NavButton
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
        >
          <Pagination.NavIcon as={ChevronLeft} />
        </Pagination.NavButton>

        {pageNumbers.map((pageNum, index) =>
          pageNum === "..." ? (
            <Pagination.Item key={`dots-${index}`} disabled>
              ...
            </Pagination.Item>
          ) : (
            <Pagination.Item
              key={pageNum}
              current={pageNum === page}
              onClick={() => onPageChange(pageNum as number)}
            >
              {pageNum}
            </Pagination.Item>
          )
        )}

        <Pagination.NavButton
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
        >
          <Pagination.NavIcon as={ChevronRightIcon} />
        </Pagination.NavButton>

        <Pagination.NavButton
          disabled={!hasNext}
          onClick={() => onPageChange(pages)}
        >
          <Pagination.NavIcon as={ChevronsRight} />
        </Pagination.NavButton>
      </Pagination.Root>

      <div className="flex items-center gap-2">
        <span className="text-sm text-text-sub-600">Mostrar:</span>
      </div>
    </div>
  );
}

export function UsersTable() {
  const {
    data,
    sorting,
    selectedRows,
    filters,
    isLoading,
    error,
    pagination,
    setSorting,
    setSelectedRows,
    setFilters,
    setPageSize,
    setCurrentPage,
  } = useUserTable();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setSelectedRows,
    state: {
      sorting,
      rowSelection: selectedRows,
    },
    initialState: {
      sorting: [
        {
          id: "user",
          desc: false,
        },
      ],
    },
  });

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-strong-950">
            Error al cargar usuarios
          </h3>
          <p className="text-text-sub-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb.Root>
          <Breadcrumb.Item>
            <Breadcrumb.Icon as={Home} />
          </Breadcrumb.Item>

          <Breadcrumb.ArrowIcon as={ChevronRight} />

          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>

          <Breadcrumb.ArrowIcon as={ChevronRight} />

          <Breadcrumb.Item active>Usuarios</Breadcrumb.Item>
        </Breadcrumb.Root>

        <SegmentedControl.Root
          value={filters.status}
          onValueChange={(value) =>
            setFilters({ status: value as "all" | "active" | "inactive" })
          }
        >
          <SegmentedControl.List>
            <SegmentedControl.Trigger value="all">
              <Users className="size-4" />
              Todos
            </SegmentedControl.Trigger>
            <SegmentedControl.Trigger value="active">
              <CheckCircle className="size-4" />
              Activos
            </SegmentedControl.Trigger>
            <SegmentedControl.Trigger value="inactive">
              <XCircle className="size-4" />
              Inactivos
            </SegmentedControl.Trigger>
          </SegmentedControl.List>
        </SegmentedControl.Root>
      </div>

      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Head key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length} className="text-center py-8">
                <Clock className="size-6 animate-spin mx-auto mb-2" />
                Cargando usuarios...
              </Table.Cell>
            </Table.Row>
          ) : table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row, index, array) => (
              <React.Fragment key={row.id}>
                <Table.Row data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
                {index < array.length - 1 && <Table.RowDivider />}
              </React.Fragment>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length} className="text-center py-8">
                <Users className="size-8 mx-auto mb-2 text-text-soft-400" />
                <p className="text-text-sub-600">No se encontraron usuarios</p>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      <TablePagination
        pagination={pagination}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
