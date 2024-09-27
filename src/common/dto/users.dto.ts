export interface GetUserDto {
  user_id: number;
  role_id: number;
  status_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  national_id: string;
  email: string;
  notes?: string;
  is_active: boolean;
  create_by?: string;
  update_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserDto {
  role_id: number;
  first_name: string;
  last_name: string;
  phone_number?: string;
  national_id?: string;
  email: string;
  password?: string;
}

export interface UpdateUserPasswordDto {
  user_id?: number;
  oldPassword: string;
  password: string;
  cpassword: string;
}

export interface CreateUpdateUserDto extends CreateUserDto {
  user_id?: number;
}
