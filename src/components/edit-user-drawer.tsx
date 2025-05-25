"use client";

import * as Button from "@/components/ui/button";
import * as Divider from "@/components/ui/divider";
import * as Drawer from "@/components/ui/drawer";
import * as Dropdown from "@/components/ui/dropdown";
import * as FormField from "@/components/ui/form-field";
import * as Input from "@/components/ui/input";
import * as React from "react";
import * as Switch from "@/components/ui/switch";

import { ChevronDown, Loader2 } from "lucide-react";
import type { CreateUserRequest, UserRole } from "@/types/user";

import { toast } from "sonner";
import { useUserForm } from "@/hooks/use-user-form";
import { useUserStore } from "@/stores/user-store";

interface EditUserDrawerProps {
  userId: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Datos de roles - mejor práctica: constantes fuera del componente
const USER_ROLES: UserRole[] = [
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

// Componente para el estado de carga
const LoadingState: React.FC<{
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = ({ isOpen, onOpenChange }) => (
  <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
    <Drawer.Content className="rounded-20 flex flex-col h-full">
      <Drawer.Header>
        <Drawer.Title>Editar Usuario</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary-base" />
          <p className="text-paragraph-sm text-text-sub-600">
            Cargando datos del usuario...
          </p>
        </div>
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Root>
);

// Componente para el selector de rol
const RoleSelector: React.FC<{
  selectedRole: string;
  onRoleChange: (role: string) => void;
  error?: string;
  hasError?: boolean;
}> = ({ selectedRole, onRoleChange, error }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedRoleData = USER_ROLES.find(
    (role) => role.value === selectedRole
  );

  return (
    <FormField.FormField
      label="Rol del usuario"
      required
      error={error}
      hint="El rol determina los permisos del usuario en el sistema"
    >
      <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dropdown.Trigger asChild>
          <Button.Root
            variant="neutral"
            mode="stroke"
            size="medium"
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="capitalize text-text-strong-950">
                {selectedRoleData?.label || "Seleccionar rol"}
              </span>
            </div>
            <Button.Icon as={ChevronDown} />
          </Button.Root>
        </Dropdown.Trigger>
        <Dropdown.Content className="w-[var(--radix-dropdown-menu-trigger-width)]">
          <Dropdown.Group>
            {USER_ROLES.map((role) => (
              <Dropdown.Item
                key={role.value}
                onSelect={() => {
                  onRoleChange(role.value);
                  setIsOpen(false);
                }}
              >
                <div className="flex flex-col gap-1">
                  <div className="text-label-sm text-text-strong-950 capitalize">
                    {role.label}
                  </div>
                  <div className="text-paragraph-xs text-text-sub-600">
                    {role.description}
                  </div>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Group>
        </Dropdown.Content>
      </Dropdown.Root>
    </FormField.FormField>
  );
};

// Componente para el toggle de estado activo - ARREGLADO
const ActiveStatusToggle: React.FC<{
  isActive: boolean;
  onToggle: (checked: boolean) => void;
}> = React.memo(({ isActive, onToggle }) => {
  // Memoizar el handler para evitar recreaciones innecesarias
  const handleToggle = React.useCallback(
    (checked: boolean) => {
      onToggle(checked);
    },
    [onToggle]
  );

  return (
    <div className="space-y-3 p-4 bg-bg-weak-50 rounded-12 border border-stroke-soft-200 rounded-20">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <label className="text-label-sm text-text-strong-950 font-medium">
            Estado del Usuario
          </label>
          <p className="text-paragraph-xs text-text-sub-600">
            Determina si el usuario puede acceder al sistema
          </p>
        </div>
        <Switch.Root checked={isActive} onCheckedChange={handleToggle} />
      </div>
      <div className="text-paragraph-xs text-text-sub-600 bg-white px-3 py-2 rounded-8 border border-stroke-soft-200">
        {isActive
          ? "✅ El usuario puede iniciar sesión"
          : "❌ El usuario no puede iniciar sesión"}
      </div>
    </div>
  );
});

ActiveStatusToggle.displayName = "ActiveStatusToggle";

export function EditUserDrawer({
  userId,
  isOpen,
  onOpenChange,
}: EditUserDrawerProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialValues, setInitialValues] =
    React.useState<Partial<CreateUserRequest> | null>(null);

  const { getUserById, updateUser } = useUserStore();

  // Cargar datos del usuario
  React.useEffect(() => {
    if (!isOpen || !userId) return;

    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUserById(userId);
        const mappedData: Partial<CreateUserRequest> = {
          first_name: userData.first_name,
          last_name: userData.last_name,
          username: userData.username,
          email: userData.email,
          role: userData.role,
          is_active: userData.active, // Mapear 'active' a 'is_active'
        };
        setInitialValues(mappedData);
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Error al cargar los datos del usuario");
        onOpenChange?.(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [isOpen, userId, getUserById, onOpenChange]);

  // Handler para actualizar usuario
  const handleSubmit = React.useCallback(
    async (values: CreateUserRequest) => {
      try {
        await updateUser(userId, values);
        toast.success("Usuario actualizado exitosamente");
        onOpenChange?.(false);
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Error al actualizar el usuario");
        throw error;
      }
    },
    [userId, updateUser, onOpenChange]
  );

  // Hook del formulario
  const {
    formik,
    getFieldProps,
    getFieldError,
    hasFieldError,
    isSubmitting,
    values,
  } = useUserForm({
    onSubmit: handleSubmit,
    initialValues: initialValues || undefined,
  });

  // Resetear formulario cuando cambian los valores iniciales
  React.useEffect(() => {
    if (initialValues && formik.resetForm) {
      formik.resetForm({ values: initialValues as CreateUserRequest });
    }
  }, [initialValues, formik.resetForm]);

  // Handler memoizado para el toggle de estado activo
  const handleActiveToggle = React.useCallback(
    (checked: boolean) => {
      formik.setFieldValue("is_active", checked);
    },
    [formik.setFieldValue]
  );

  // Handler memoizado para el cambio de rol
  const handleRoleChange = React.useCallback(
    (role: string) => {
      formik.setFieldValue("role", role);
    },
    [formik.setFieldValue]
  );

  // Mostrar estado de carga
  if (isLoading || !initialValues) {
    return <LoadingState isOpen={isOpen} onOpenChange={onOpenChange} />;
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Content className="rounded-20 flex flex-col h-full">
        <Drawer.Header>
          <Drawer.Title>Editar Usuario</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body className="flex-1 overflow-auto">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Divider.Root variant="solid-text">
                Información Personal
              </Divider.Root>

              <div className="p-5 space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField.FormField
                    label="Nombre"
                    required
                    error={getFieldError("first_name")}
                  >
                    <Input.Root hasError={hasFieldError("first_name")}>
                      <Input.Wrapper>
                        <Input.Input
                          {...getFieldProps("first_name")}
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
                      />
                    </Input.Wrapper>
                  </Input.Root>
                </FormField.FormField>
              </div>
            </div>

            <div className="space-y-4">
              <Divider.Root variant="solid-text">Configuración</Divider.Root>
              <div className="p-5 space-y-6">
                <RoleSelector
                  selectedRole={values.role}
                  onRoleChange={handleRoleChange}
                  error={getFieldError("role")}
                  hasError={hasFieldError("role")}
                />

                <ActiveStatusToggle
                  isActive={values.is_active}
                  onToggle={handleActiveToggle}
                />
              </div>
            </div>
          </form>
        </Drawer.Body>

        <Drawer.Footer className="sticky bottom-0 z-10 bg-white border-t border-stroke-soft-200 p-4">
          <div className="flex w-full gap-3">
            <Drawer.Close asChild>
              <Button.Root
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
              variant="primary"
              mode="filled"
              size="medium"
              className="flex-1"
              onClick={formik.handleSubmit}
              disabled={isSubmitting || !formik.isValid}
            >
              {isSubmitting ? (
                <>
                  <Button.Icon as={Loader2} className="animate-spin" />
                  Actualizando...
                </>
              ) : (
                "Actualizar Usuario"
              )}
            </Button.Root>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}
