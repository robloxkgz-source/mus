import { ReactNode } from "react";
export type SubmenuItem = {
    label: string;
    href: string;
  };    
  
export interface HeaderItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  submenu?: HeaderItem[];
  external?: boolean; // ← добавляем это
}


