"use client";

import * as Button from "@/components/ui/button";
import * as Divider from "@/components/ui/divider";
import * as Drawer from "@/components/ui/drawer";
import * as Dropdown from "@/components/ui/dropdown";
import * as Hint from "@/components/ui/hint";
import * as Input from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import * as React from "react";
import * as Switch from "@/components/ui/switch";

import { AtSign, Info, Mail, Plus, Shield, User } from "lucide-react";

function IconInfoCustom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 16.25a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm1.116-3.041l.1-.408a1.709 1.709 0 01-.25.083 1.176 1.176 0 01-.308.048c-.193 0-.329-.032-.407-.095-.079-.064-.118-.184-.118-.359a3.514 3.514 0 01.118-.672l.373-1.318c.037-.121.062-.255.075-.4a3.73 3.73 0 00.02-.304.866.866 0 00-.292-.678c-.195-.174-.473-.26-.833-.26-.2 0-.412.035-.636.106-.224.07-.459.156-.704.256l-.1.409c.073-.028.16-.057.262-.087.101-.03.2-.045.297-.045.198 0 .331.034.4.1.07.066.105.185.105.354 0 .093-.01.197-.034.31a6.216 6.216 0 01-.084.36l-.374 1.325c-.033.14-.058.264-.073.374-.015.11-.022.22-.022.325 0 .272.1.496.301.673.201.177.483.265.846.265.236 0 .443-.03.621-.092s.417-.152.717-.27zM11.05 7.85a.772.772 0 00.26-.587.78.78 0 00-.26-.59.885.885 0 00-.628-.244.893.893 0 00-.63.244.778.778 0 00-.264.59c0 .23.088.426.263.587a.897.897 0 00.63.243.888.888 0 00.629-.243z"
        fill="currentColor"
      />
    </svg>
  );
}

const UserRoleOption = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dropdown.Item> & {
    role: string;
    description: string;
  }
>(({ role, description, ...rest }, forwardedRef) => {
  return (
    <Dropdown.Item ref={forwardedRef} {...rest}>
      <div className="flex flex-col gap-1">
        <div className="text-label-sm text-text-strong-950 capitalize">
          {role}
        </div>
        <div className="text-paragraph-xs text-text-sub-600">{description}</div>
      </div>
    </Dropdown.Item>
  );
});
UserRoleOption.displayName = "UserRoleOption";

export function AddUserDrawer() {
  const [selectedRole, setSelectedRole] = React.useState("user");
  const [isActive, setIsActive] = React.useState(true);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false);

  const roles = [
    {
      value: "admin",
      label: "Admin",
      description: "Acceso completo al sistema",
    },
    {
      value: "user",
      label: "Usuario",
      description: "Acceso limitado a funcionalidades básicas",
    },
    {
      value: "moderator",
      label: "Moderador",
      description: "Acceso intermedio con permisos específicos",
    },
  ];

  const selectedRoleData = roles.find((role) => role.value === selectedRole);

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button.Root variant="neutral" mode="filled">
          <Button.Icon as={Plus} />
          Agregar Usuario
        </Button.Root>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Agregar Nuevo Usuario</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <div className="space-y-6 p-5">
            <Divider.Root variant="solid-text">
              Información Personal
            </Divider.Root>

            <div className="space-y-2">
              <Label.Root htmlFor="firstName">
                Nombre
                <Label.Asterisk />
              </Label.Root>
              <Input.Root>
                <Input.Wrapper>
                  <Input.Icon as={User} />
                  <Input.Input id="firstName" placeholder="Ingresa el nombre" />
                </Input.Wrapper>
              </Input.Root>
            </div>

            <div className="space-y-2">
              <Label.Root htmlFor="lastName">
                Apellido
                <Label.Asterisk />
              </Label.Root>
              <Input.Root>
                <Input.Wrapper>
                  <Input.Icon as={User} />
                  <Input.Input
                    id="lastName"
                    placeholder="Ingresa el apellido"
                  />
                </Input.Wrapper>
              </Input.Root>
            </div>

            <Divider.Root variant="solid-text">Credenciales</Divider.Root>

            <div className="space-y-2">
              <Label.Root htmlFor="username">
                Nombre de Usuario
                <Label.Asterisk />
                <IconInfoCustom className="text-text-disabled-300 size-5" />
              </Label.Root>
              <Input.Root>
                <Input.Wrapper>
                  <Input.Icon as={AtSign} />
                  <Input.Input id="username" placeholder="username" />
                </Input.Wrapper>
              </Input.Root>
              <Hint.Root>
                <Hint.Icon as={Info} />
                El nombre de usuario debe ser único en el sistema.
              </Hint.Root>
            </div>

            <div className="space-y-2">
              <Label.Root htmlFor="email">
                Email
                <Label.Asterisk />
                <Label.Sub>(Requerido para notificaciones)</Label.Sub>
              </Label.Root>
              <Input.Root>
                <Input.Wrapper>
                  <Input.Icon as={Mail} />
                  <Input.Input
                    id="email"
                    type="email"
                    placeholder="email@ejemplo.com"
                  />
                </Input.Wrapper>
              </Input.Root>
              <Hint.Root>
                <Hint.Icon as={Info} />
                Se enviará un enlace de verificación a este email.
              </Hint.Root>
            </div>

            <Divider.Root variant="solid-text">Configuración</Divider.Root>

            <div className="space-y-2">
              <Label.Root>
                Rol
                <Label.Asterisk />
                <IconInfoCustom className="text-text-disabled-300 size-5" />
              </Label.Root>
              <Dropdown.Root
                open={isRoleDropdownOpen}
                onOpenChange={setIsRoleDropdownOpen}
              >
                <Dropdown.Trigger asChild>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-10 bg-bg-white-0 px-3 py-2.5 text-left shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:shadow-none hover:ring-transparent focus:outline-none focus:shadow-button-important-focus focus:ring-stroke-strong-950"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="size-5 text-text-sub-600" />
                      <div className="flex flex-col">
                        <span className="text-paragraph-sm text-text-strong-950 capitalize">
                          {selectedRoleData?.label}
                        </span>
                        <span className="text-paragraph-xs text-text-sub-600">
                          {selectedRoleData?.description}
                        </span>
                      </div>
                    </div>
                    <svg
                      className={`size-5 text-text-sub-600 transition-transform duration-200 ${
                        isRoleDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content
                  align="start"
                  className="w-[--radix-dropdown-menu-trigger-width]"
                >
                  {roles.map((role) => (
                    <UserRoleOption
                      key={role.value}
                      role={role.label}
                      description={role.description}
                      onSelect={() => {
                        setSelectedRole(role.value);
                        setIsRoleDropdownOpen(false);
                      }}
                    />
                  ))}
                </Dropdown.Content>
              </Dropdown.Root>
              <Hint.Root>
                <Hint.Icon as={Info} />
                El rol determina los permisos del usuario en el sistema.
              </Hint.Root>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label.Root>Estado del Usuario</Label.Root>
                <div className="text-paragraph-xs text-text-sub-600">
                  Determina si el usuario puede acceder al sistema
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-bg-weak-50 p-3">
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm text-text-strong-950">
                    Usuario Activo
                  </span>
                  <span className="text-paragraph-xs text-text-sub-600">
                    {isActive
                      ? "El usuario puede iniciar sesión"
                      : "El usuario no puede iniciar sesión"}
                  </span>
                </div>
                <Switch.Root checked={isActive} onCheckedChange={setIsActive} />
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="size-3 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <div className="text-label-sm text-blue-800">
                    Información importante
                  </div>
                  <div className="text-paragraph-xs text-blue-700">
                    Se enviará un email de bienvenida al usuario con
                    instrucciones para establecer su contraseña.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Body>

        <Drawer.Footer>
          <div className="flex gap-3 w-full">
            <Drawer.Close asChild>
              <Button.Root
                variant="neutral"
                mode="stroke"
                size="medium"
                className="flex-1"
              >
                Cancelar
              </Button.Root>
            </Drawer.Close>
            <Button.Root
              variant="primary"
              mode="filled"
              size="medium"
              className="flex-1 bg-[#e8114b] hover:bg-[#d0003a] focus-visible:shadow-button-important-focus"
            >
              <Button.Icon as={Plus} />
              Crear Usuario
            </Button.Root>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}
