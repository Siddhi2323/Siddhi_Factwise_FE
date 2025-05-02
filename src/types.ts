export interface Celebrity {
    id: number;
    first: string;
    last: string;
    dob: string;
    gender: string;
    email: string;
    picture: string;
    country: string;
    description: string;
    age?: number;
  }
  
  export type GenderOption = 'male' | 'female' | 'transgender' | 'Rather not say' | 'other';