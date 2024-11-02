export interface InfringingProduct {
  product_name: string;
  infringement_likelihood: string;
  relevant_claims: string[];
  explanation: string;
  specific_features: string[];
}

export interface Analysis {
  analysis_id: string;
  patent_id: string;
  company_name: string;
  analysis_date: string;
  top_infringing_products: InfringingProduct[];
  overall_risk_assessment: string;
}
