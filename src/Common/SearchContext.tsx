import React, { useState } from 'react';
import { SearchContext } from './SearchContextDef';

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{ visible, setVisible, searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}
