/**
 * @file SidebarContext.tsx
 * @description 사이드바의 열림/닫힘 상태 및 즐겨찾기(Favorites) 리스트를 관리하는 전역 컨텍스트입니다.
 */

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  favorites: Set<string>;
  toggleFavorite: (label: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["Roles", "Dealers"]));

  const toggleFavorite = (label: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) newSet.delete(label);
      else newSet.add(label);
      return newSet;
    });
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, favorites, toggleFavorite }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  // Return a safe fallback during build/SSR if context is missing
  if (context === undefined) {
    return {
      isOpen: true,
      setIsOpen: () => { },
      favorites: new Set<string>(),
      toggleFavorite: () => { },
    };
  }
  return context;
}
