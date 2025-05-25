"use client";

import * as Button from "@/components/ui/button";
import * as Modal from "@/components/ui/modal";
import * as React from "react";

import { Trash2 } from "lucide-react";
import { UserTableData } from "@/types/user-table";
import { toast } from "sonner";
import { useUserStore } from "@/stores/user-store";

interface DeleteUserModalProps {
  user: UserTableData;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteUserModal({
  user,
  isOpen,
  onOpenChange,
}: DeleteUserModalProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { deleteUser } = useUserStore();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);

      toast.success("Usuario eliminado", {
        description: `${user.first_name} ${user.last_name} ha sido eliminado del sistema.`,
      });

      onOpenChange?.(false);
    } catch (error) {
      toast.error("Error al eliminar usuario", {
        description:
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content className="max-w-[440px]">
        <Modal.Title className="sr-only">Eliminar Usuario</Modal.Title>
        <Modal.Body className="flex items-start gap-4">
          <div className="rounded-lg bg-error-lighter flex size-10 shrink-0 items-center justify-center">
            <Trash2 className="text-error-base size-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="text-label-md text-text-strong-950">
              Eliminar Usuario
            </div>
            <div className="text-paragraph-sm text-text-sub-600">
              ¿Estás seguro de que quieres eliminar a{" "}
              <span className="font-medium text-text-strong-950">
                {user.first_name} {user.last_name}
              </span>
              ? Esta acción no se puede deshacer.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button.Root
              variant="neutral"
              mode="stroke"
              size="small"
              className="flex-1"
              disabled={isDeleting}
            >
              Cancelar
            </Button.Root>
          </Modal.Close>
          <Button.Root
            variant="error"
            mode="filled"
            size="small"
            className="flex-1"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button.Root>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
