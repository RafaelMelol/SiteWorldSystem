export interface NavLink {
  label: string;
  href: string;
}

export interface NavSection {
  label: string;
  href?: string;
  children?: NavLink[];
}

export interface Address {
  street: string;
  neighborhood: string;
  zip: string;
  city: string;
  state: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface ContactInfo {
  address: Address;
  phone: string;
  phoneDisplay: string;
  phoneWhatsapp: boolean;
  onCallPhone: string;
  onCallPhoneDisplay: string;
  email: string;
  social: SocialLinks;
}

export interface FeatureGroup {
  title: string;
  description: string;
  items: string[];
}

export interface Solution {
  slug: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  segments?: string[];
  featureGroups: { title: string; items: string[] }[];
}

export interface Integration {
  name: string;
  description: string;
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  description: string;
  items: FaqItem[];
}

export interface SupportHours {
  weekdayLabel: string;
  weekdayHours: string;
  weekdayNote: string;
  saturdayLabel: string;
  saturdayHours: string;
  saturdayNote: string;
}

