import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: Siswa;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Siswa {
  id: number;
  nis: string;
  nisn: string | null;
  nampan: string | null;
  namman: string | null;
  namlen: string;
  jenkel: string;
  temlah: string;
  tgllah: string;
  tel: string | null;
  kel: string;
  ket: string | null;
  sta: number;
  staqd: number;
  rev: number;
  createdby: number;
  createdat: string;
  updatedby: number;
  updatedat: string;
}


export interface Bank {
  id: number;
  name: string;
  logo: string;
}

export interface Nominal {
  id: number;
  amount: number;
}

export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
}