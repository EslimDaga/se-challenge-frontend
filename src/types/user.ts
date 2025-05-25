export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: "admin" | "user" | "moderator";
  is_active: boolean;
}

export interface UserRole {
  value: string;
  label: string;
  description: string;
}

export interface FormFieldError {
  field: string;
  message: string;
}
