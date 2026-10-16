// Language types
export type Language = 'bn' | 'en';

// Navigation types
export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  children?: NavItem[];
}

// Notice types
export interface Notice {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  category: 'notice' | 'event' | 'result' | 'admission';
  isUrgent?: boolean;
  link?: string;
}

// Teacher types
export interface Teacher {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  department: string;
  departmentEn: string;
  image?: string;
}

// Department types
export interface Department {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}

// General content section
export interface ContentSection {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

// Institution info
export interface InstitutionInfo {
  name: string;
  nameEn: string;
  shortName: string;
  shortNameEn: string;
  established: string;
  eiin?: string;
  address: string;
  addressEn: string;
  phone?: string;
  email?: string;
  website?: string;
}
