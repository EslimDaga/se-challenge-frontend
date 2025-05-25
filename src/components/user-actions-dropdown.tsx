"use client";

import * as Button from "@/components/ui/button";
import * as Dropdown from "@/components/ui/dropdown";
import * as React from "react";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { DeleteUserModal } from "./delete-user-modal";
import { EditUserDrawer } from "./edit-user-drawer";
import { UserTableData } from "@/types/user-table";

interface UserActionsDropdownProps {
  user: UserTableData;
}

export function UserActionsDropdown({ user }: UserActionsDropdownProps) {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  return (
    <>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <Button.Root variant="neutral" mode="ghost" size="xsmall">
            <Button.Icon as={MoreHorizontal} />
          </Button.Root>
        </Dropdown.Trigger>
        <Dropdown.Content align="end">
          <Dropdown.Group>
            <Dropdown.Item onSelect={() => setIsEditDrawerOpen(true)}>
              <Dropdown.ItemIcon as={Edit} />
              Editar usuario
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => setIsDeleteModalOpen(true)}
              className="text-error-base focus:text-error-base"
            >
              <Dropdown.ItemIcon as={Trash2} />
              Eliminar usuario
            </Dropdown.Item>
          </Dropdown.Group>
        </Dropdown.Content>
      </Dropdown.Root>

      <EditUserDrawer
        userId={user.id}
        isOpen={isEditDrawerOpen}
        onOpenChange={setIsEditDrawerOpen}
      />

      <DeleteUserModal
        user={user}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
}
