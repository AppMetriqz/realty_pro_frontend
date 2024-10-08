export interface ContactData {
  id: string | number;
  name: string;
  type: string;
  phone: string;
  email: string;
  created_at: string;
}

export type DiffContactTypes = {
  label: string;
  value: string;
};
