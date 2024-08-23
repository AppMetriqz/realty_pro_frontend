export type CreateSellDto = {
  project_id: string | string[];
  unit_id?: string | number | string[] | null;
  client_id: number;
  seller_id: number;
  commission: number;
  notes?: string;
};

export type CreateAllSellDto = {
  project_id: string | string[];
  unit_ids?: string | number | string[] | null;
  client_id: number;
  seller_id: number;
  commission: number;
  notes?: string;
};

export type UpdateSellDto = {
  sale_id: number;
  project_id: number;
  unit_id: number;
  client_id: number;
  seller_id: number;
  commission: number;
  stage: string;
};

export type GetSellDto = {
  sale_id: number;
  price: string;
  commission: number;
  notes?: string;
  stage: string;
  is_active: boolean;
  create_by: number;
  update_by?: number;
  created_at: string;
  updated_at: string;
  project: {
    project_id: number;
    name: string;
  };
  unit: {
    unit_id: number;
    name: string;
  };
  client: {
    contact_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number_1: string;
    national_id: string;
  };
  seller: {
    contact_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number_1: string;
    national_id: string;
  };
};
