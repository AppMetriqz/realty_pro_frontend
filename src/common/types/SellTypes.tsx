export type SellFormType = {
  project_id?: string | number;
  unit_id: string | number;
  client_id?: string | undefined;
  seller_id: string;
  price: string;
  commission: number;
  notes?: string;
  client: { contact_id: number,client_id:number, first_name: string, last_name: string };
  seller: { contact_id: number,seller_id:number, first_name: string, last_name: string };
};

export type CancelUnitSaleType = {
  notes: string;
  sale_id: string | number | string[];
};
