export interface UserDto {
  user_id?: number;
  role_id: number;
  status_id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  create_by?: number;
  update_by?: number;
  ID_PortalB2BUsuario: string;
}
