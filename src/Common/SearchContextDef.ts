import { createContext } from 'react';

export type SearchContextValue = {
  visible: boolean;
  setVisible: (v: boolean) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
};

export const SearchContext = createContext<SearchContextValue | undefined>(undefined);
