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
    id: "first_name",
    accessorKey: "first_name",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Nombre
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
        {row.original.first_name}
      </span>
    ),
  },
  {
    id: "last_name",
    accessorKey: "last_name",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Apellido
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
        {row.original.last_name}
      </span>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Email
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
      <span className="text-paragraph-sm text-text-sub-600">
        {row.original.email}
      </span>
    ),
  },
  {
    id: "username",
    accessorKey: "username",
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
        <span className="text-label-sm text-text-strong-950 capitalize">
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
  onPageSizeChange,
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
    <div className="sticky bottom-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
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
          <select
            value={size}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
            className="h-8 px-2 text-sm border border-stroke-soft-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-base"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
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
          id: "first_name",
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
    <div className="flex flex-col h-full w-full">
      <div className="mb-6">
        <Breadcrumb.Root>
          <Breadcrumb.Item>
            <Breadcrumb.Icon as={Home} />
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.ArrowIcon as={ChevronRight} />
          <Breadcrumb.Item active>Usuarios</Breadcrumb.Item>
        </Breadcrumb.Root>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-strong-950">
          Lista de Usuarios
        </h2>

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

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
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
                  <Table.Cell
                    colSpan={columns.length}
                    className="text-center py-8"
                  >
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
                  <Table.Cell
                    colSpan={columns.length}
                    className="text-center py-8"
                  >
                    <Users className="size-8 mx-auto mb-2 text-text-soft-400" />
                    <p className="text-text-sub-600">
                      No se encontraron usuarios
                    </p>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </div>

        <TablePagination
          pagination={pagination}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}
