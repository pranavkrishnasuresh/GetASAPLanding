
export interface IntelligenceResponse {
  detection: string;
  reasoning: string;
  action: string;
  wasteReduction: string;
  stockoutRate: string;
  serviceLevel: string;
}

export interface Investor {
  name: string;
  description?: string;
  logo?: string;
  isPerson?: boolean;
}

export interface AdaptSystemCard {
  detection: string;
  reasoning: string;
  action: string;
}
