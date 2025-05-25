import * as Yup from "yup";

export const createUserValidationSchema = Yup.object({
  first_name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras"
    )
    .required("El nombre es requerido"),

  last_name: Yup.string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apellido solo puede contener letras"
    )
    .required("El apellido es requerido"),

  username: Yup.string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(30, "El nombre de usuario no puede exceder 30 caracteres")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "El nombre de usuario solo puede contener letras, números y guiones bajos"
    )
    .required("El nombre de usuario es requerido"),

  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email es requerido"),

  role: Yup.string()
    .oneOf(["admin", "user", "moderator"], "Selecciona un rol válido")
    .required("El rol es requerido"),

  is_active: Yup.boolean().default(true),
});

export type CreateUserFormData = Yup.InferType<
  typeof createUserValidationSchema
>;
