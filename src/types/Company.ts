export interface Company {
  name: string;
  products: { name: string; description: string }[];
}

export interface CompanyData {
  companies: Company[];
}
