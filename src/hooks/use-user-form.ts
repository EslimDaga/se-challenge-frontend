import { useFormik } from "formik";
import {
  createUserValidationSchema,
  type CreateUserFormData,
} from "@/schemas/user-validation";
import type { CreateUserRequest } from "@/types/user";

interface UseUserFormProps {
  onSubmit: (values: CreateUserRequest) => void | Promise<void>;
  initialValues?: Partial<CreateUserFormData>;
}

const defaultInitialValues: CreateUserFormData = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  role: "user",
  is_active: true,
};

export function useUserForm({ onSubmit, initialValues }: UseUserFormProps) {
  const formik = useFormik<CreateUserFormData>({
    initialValues: {
      ...defaultInitialValues,
      ...initialValues,
    },
    validationSchema: createUserValidationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        setSubmitting(true);
        await onSubmit(values);
      } catch (error) {
        if (error && typeof error === "object" && "detail" in error) {
          const details = error.detail as Array<{
            loc: string[];
            msg: string;
          }>;

          details.forEach((detail) => {
            const fieldName = detail.loc[detail.loc.length - 1];
            if (fieldName && fieldName in values) {
              setFieldError(fieldName, detail.msg);
            }
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const getFieldProps = (fieldName: keyof CreateUserFormData) => ({
    id: fieldName,
    name: fieldName,
    value: formik.values[fieldName],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  });

  const getFieldError = (fieldName: keyof CreateUserFormData) => {
    return formik.touched[fieldName] && formik.errors[fieldName]
      ? formik.errors[fieldName]
      : undefined;
  };

  const hasFieldError = (fieldName: keyof CreateUserFormData) => {
    return Boolean(formik.touched[fieldName] && formik.errors[fieldName]);
  };

  return {
    formik,
    getFieldProps,
    getFieldError,
    hasFieldError,
    isValid: formik.isValid,
    isSubmitting: formik.isSubmitting,
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
  };
}
