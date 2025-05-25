"use client";

import * as Button from "@/components/ui/button";
import * as Divider from "@/components/ui/divider";
import * as Drawer from "@/components/ui/drawer";
import * as Dropdown from "@/components/ui/dropdown";
import * as FormField from "@/components/ui/form-field";
import * as Input from "@/components/ui/input";
import * as React from "react";
import * as Switch from "@/components/ui/switch";

import { ChevronDown, Loader2, Plus } from "lucide-react";
import { CreateUserRequest, UserRole } from "@/types/user";

import { toast } from "sonner";
import { useUserForm } from "@/hooks/use-user-form";

const UserRoleOption = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dropdown.Item> & {
    role: string;
    description: string;
  }
>(({ role, ...rest }, forwardedRef) => {
  return (
    <Dropdown.Item ref={forwardedRef} {...rest}>
      <div className="flex flex-col gap-1">
        <div className="text-label-sm text-text-strong-950 capitalize">
          {role}
        </div>
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
      value: "moderator",
      label: "Moderador",
      description: "Acceso intermedio con permisos de moderación",
    },
  ];

  const handleSubmit = async (values: CreateUserRequest) => {
    try {
      await onSubmit(values);

      toast.success("Usuario creado exitosamente", {
        description: `${values.first_name} ${values.last_name} ha sido agregado al sistema.`,
      });

      formik.resetForm();

      onOpenChange?.(false);
    } catch (error) {
      toast.error("Error al crear usuario", {
        description:
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado",
      });
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
            <Divider.Root variant="solid-text">
              Información Personal
            </Divider.Root>

            <div className="p-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField.FormField
                  label="Nombre"
                  required
                  error={getFieldError("first_name")}
                >
                  <Input.Root hasError={hasFieldError("first_name")}>
                    <Input.Wrapper>
                      <Input.Input
                        {...getFieldProps("first_name")}
                        type="text"
                        value={String(getFieldProps("first_name").value)}
                        placeholder="Ingresa el nombre"
                      />
                    </Input.Wrapper>
                  </Input.Root>
                </FormField.FormField>

                <FormField.FormField
                  label="Apellido"
                  required
                  error={getFieldError("last_name")}
                >
                  <Input.Root hasError={hasFieldError("last_name")}>
                    <Input.Wrapper>
                      <Input.Input
                        {...getFieldProps("last_name")}
                        type="text"
                        value={String(getFieldProps("last_name").value)}
                        placeholder="Ingresa el apellido"
                      />
                    </Input.Wrapper>
                  </Input.Root>
                </FormField.FormField>
              </div>
            </div>

            <Divider.Root variant="solid-text">Credenciales</Divider.Root>

            <div className="p-5 space-y-6">
              <FormField.FormField
                label="Nombre de Usuario"
                required
                error={getFieldError("username")}
                hint="El nombre de usuario debe ser único en el sistema."
              >
                <Input.Root hasError={hasFieldError("username")}>
                  <Input.Wrapper>
                    <Input.Input
                      {...getFieldProps("username")}
                      type="text"
                      value={String(getFieldProps("username").value)}
                      placeholder="Ingresa el nombre de usuario"
                    />
                  </Input.Wrapper>
                </Input.Root>
              </FormField.FormField>

              <FormField.FormField
                label="Email"
                required
                error={getFieldError("email")}
                hint="Se enviará un enlace de verificación a este email."
              >
                <Input.Root hasError={hasFieldError("email")}>
                  <Input.Wrapper>
                    <Input.Input
                      {...getFieldProps("email")}
                      type="email"
                      placeholder="email@ejemplo.com"
                      value={String(getFieldProps("email").value)}
                    />
                  </Input.Wrapper>
                </Input.Root>
              </FormField.FormField>
            </div>

            <Divider.Root variant="solid-text">Configuración</Divider.Root>

            <div className="p-5 space-y-6">
              <FormField.FormField
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
                    <Button.Root
                      variant="neutral"
                      mode="stroke"
                      className="w-full justify-between"
                      type="button"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-paragraph-sm text-text-strong-950 capitalize">
                          {selectedRoleData?.label || "Seleccionar rol"}
                        </span>
                      </div>
                      <Button.Icon as={ChevronDown} />
                    </Button.Root>
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
                        onClick={() => {
                          formik.setFieldValue("role", role.value);
                          setIsRoleDropdownOpen(false);
                        }}
                      />
                    ))}
                  </Dropdown.Content>
                </Dropdown.Root>
              </FormField.FormField>

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
            </div>
          </form>
        </Drawer.Body>

        <Drawer.Footer className="sticky bottom-0 z-10 bg-white border-t border-stroke-soft-200">
          <div className="flex w-full gap-3">
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
              type="submit"
              form="add-user-form"
              variant="primary"
              mode="filled"
              size="medium"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Button.Icon as={Loader2} className="animate-spin" />
                  Creando Usuario
                </>
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
