export type SellFormType = {
  project_id?: string | number;
  unit_id: string | number;
  client_id: string;
  seller_id: string;
  price: string;
  commission: number;
  notes?: string;
};

export type CancelUnitSaleType = {
  notes: string;
  sale_id: string | number | string[];
};
