export type ScreenType = 'home' | 'profiles' | 'register' | 'kundali' | 'contact';
export type LanguageType = 'mr' | 'en';

export interface Profile {
  id: string;
  name: string;
  gender: 'bride' | 'groom';
  age: number;
  height: string;
  education: string;
  profession: string;
  companyOrBusiness?: string;
  income?: string;
  city: string;
  district: string;
  caste: string;
  subcaste?: string;
  gotra: string;
  rashi: string;
  nakshatra: string;
  manglik: 'होय' | 'नाही' | 'सौम्य';
  matchScore: number;
  verified: boolean;
  photoUrl: string;
  about: string;
  familyDetails: string;
  partnerExpectations: string;
}

export interface Testimonial {
  id: string;
  coupleNames: string;
  weddingDate: string;
  locations: string;
  community: string;
  professions: string;
  quote: string;
  rating: number;
  imageUrl?: string;
}

export interface BiodataFormState {
  gender: 'bride' | 'groom';
  caste: string;
  subcaste: string;
  fullName: string;
  surname: string;
  dob: string;
  birthTime: string;
  rashi: string;
  height: string;
  varna: string;
  bloodGroup: string;
  education: string;
  currentJob: string;
  salary: string;
  agriculture: string;
  address: string;
  nativeVillage: string;
  fatherName: string;
  uncleName: string;
  sister: string;
  brother: string;
  mamaName: string;
  mamaVillage: string;
  expectations: string;
  relations: string;
  contactNumber: string;
  email: string;
  agreedToTerms: boolean;
}
