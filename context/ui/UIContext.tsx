import { createContext } from 'react';

interface ContextProps {
   isMenuOpen: boolean;
   search: string;

   isVisibleSearch: boolean;

   //Methods
   toggleSideMenu: () => void;
   changeSearchTerm: (searchTerm: string) => void;

   toggleSearch: () => void;
}

export const UIContext = createContext({} as ContextProps);
