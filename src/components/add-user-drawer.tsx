"use client";

import * as Button from "@/components/ui/button";
import * as Divider from "@/components/ui/divider";
import * as Drawer from "@/components/ui/drawer";
import * as Dropdown from "@/components/ui/dropdown";
import * as Input from "@/components/ui/input";
import * as React from "react";
import * as Switch from "@/components/ui/switch";

import { AtSign, Mail, Plus, Shield, User } from "lucide-react";
import type { CreateUserRequest, UserRole } from "@/types/user";

import { FormField } from "@/components/ui/form-field";
import { useUserForm } from "@/hooks/use-user-form";

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

interface AddUserDrawerProps {
  onSubmit?: (data: CreateUserRequest) => void | Promise<void>;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddUserDrawer({
  onSubmit = async () => {},
  isOpen,
  onOpenChange,
}: AddUserDrawerProps) {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false);

  const roles: UserRole[] = [
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
      value: "guest",
      label: "Invitado",
      description: "Acceso restringido a ciertas áreas",
    },
  ];

  const handleSubmit = async (values: CreateUserRequest) => {
    try {
      await onSubmit(values);

      onOpenChange?.(false);
    } catch (error) {
      throw error;
    }
  };

  const {
    formik,
    getFieldProps,
    getFieldError,
    hasFieldError,
    isSubmitting,
    values,
  } = useUserForm({
    onSubmit: handleSubmit,
  });

  const selectedRoleData = roles.find((role) => role.value === values.role);

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Trigger asChild>
        <Button.Root variant="primary" mode="filled">
          <Button.Icon as={Plus} />
          Agregar Usuario
        </Button.Root>
      </Drawer.Trigger>
      <Drawer.Content className="rounded-20 flex flex-col h-full">
        <Drawer.Header className="sticky top-0 z-10 bg-white border-b border-stroke-soft-200">
          <Drawer.Title>Agregar Nuevo Usuario</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body className="flex-1 overflow-y-auto relative">
          <form id="add-user-form" onSubmit={formik.handleSubmit}>
            <div className="p-5 rounded-xl">
              <div className="flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary-alpha-10">
                  <User className="size-8 text-primary-base" />
                </div>
              </div>
            </div>

            <Divider.Root variant="solid-text">
              Información Personal
            </Divider.Root>

            <div className="p-5 space-y-6">
              <FormField
                label="Nombre"
                required
                error={getFieldError("first_name")}
              >
                <Input.Root hasError={hasFieldError("first_name")}>
                  <Input.Wrapper>
                    <Input.Icon as={User} />
                    <Input.Input
                      {...getFieldProps("first_name")}
                      placeholder="Ingresa el nombre"
                    />
                  </Input.Wrapper>
                </Input.Root>
              </FormField>

              <FormField
                label="Apellido"
                required
                error={getFieldError("last_name")}
              >
                <Input.Root hasError={hasFieldError("last_name")}>
                  <Input.Wrapper>
                    <Input.Icon as={User} />
                    <Input.Input
                      {...getFieldProps("last_name")}
                      placeholder="Ingresa el apellido"
                    />
                  </Input.Wrapper>
                </Input.Root>
              </FormField>
            </div>

            <Divider.Root variant="solid-text">Credenciales</Divider.Root>

            <div className="p-5 space-y-6">
              <FormField
                label="Nombre de Usuario"
                required
                error={getFieldError("username")}
                hint="El nombre de usuario debe ser único en el sistema."
              >
                <Input.Root hasError={hasFieldError("username")}>
                  <Input.Wrapper>
                    <Input.Icon as={AtSign} />
                    <Input.Input
                      {...getFieldProps("username")}
                      placeholder="username"
                    />
                  </Input.Wrapper>
                </Input.Root>
              </FormField>

              <FormField
                label="Email"
                required
                error={getFieldError("email")}
                hint="Se enviará un enlace de verificación a este email."
              >
                <Input.Root hasError={hasFieldError("email")}>
                  <Input.Wrapper>
                    <Input.Icon as={Mail} />
                    <Input.Input
                      {...getFieldProps("email")}
                      type="email"
                      placeholder="email@ejemplo.com"
                    />
                  </Input.Wrapper>
                </Input.Root>
              </FormField>
            </div>

            <Divider.Root variant="solid-text">Configuración</Divider.Root>

            <div className="p-5 space-y-6">
              <FormField
                label="Rol"
                required
                error={getFieldError("role")}
                hint="El rol determina los permisos del usuario en el sistema."
              >
                <Dropdown.Root
                  open={isRoleDropdownOpen}
                  onOpenChange={setIsRoleDropdownOpen}
                >
                  <Dropdown.Trigger asChild>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-10 bg-bg-white-0 px-3 py-2.5 text-left shadow-regular-xs ring-1 ring-inset transition duration-200 ease-out hover:bg-bg-weak-50 hover:shadow-none hover:ring-transparent focus:outline-none focus:shadow-button-important-focus focus:ring-stroke-strong-950 ${
                        hasFieldError("role")
                          ? "ring-error-base"
                          : "ring-stroke-soft-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="size-5 text-text-sub-600" />
                        <div className="flex flex-col">
                          <span className="text-paragraph-sm text-text-strong-950 capitalize">
                            {selectedRoleData?.label || "Seleccionar rol"}
                          </span>
                          <span className="text-paragraph-xs text-text-sub-600">
                            {selectedRoleData?.description ||
                              "Selecciona un rol para el usuario"}
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
                          formik.setFieldValue("role", role.value);
                          setIsRoleDropdownOpen(false);
                        }}
                      />
                    ))}
                  </Dropdown.Content>
                </Dropdown.Root>
              </FormField>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-label-sm text-text-strong-950">
                    Estado del Usuario
                  </label>
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
                      {values.is_active
                        ? "El usuario puede iniciar sesión"
                        : "El usuario no puede iniciar sesión"}
                    </span>
                  </div>
                  <Switch.Root
                    checked={values.is_active}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("is_active", checked)
                    }
                  />
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
          </form>
        </Drawer.Body>

        <Drawer.Footer className="sticky bottom-0 z-10 bg-white border-t border-stroke-soft-200">
          <div className="flex w-full gap-3 justify-between">
            <Drawer.Close asChild>
              <Button.Root
                type="button"
                variant="neutral"
                mode="stroke"
                size="medium"
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button.Root>
            </Drawer.Close>
            <Button.Root
              type="submit"
              form="add-user-form"
              variant="primary"
              mode="filled"
              size="medium"
              className="flex-1"
              disabled={isSubmitting || !formik.isValid}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span className="ml-2">Creando...</span>
                </div>
              ) : (
                <>
                  <Button.Icon as={Plus} />
                  Crear Usuario
                </>
              )}
            </Button.Root>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}
