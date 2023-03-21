'use client';

import React, { useReducer, useMemo } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
   isMenuOpen: boolean;
   search: string;

   isVisibleSearch: boolean;
}

const UI_INITIAL_STATE: UIState = {
   isMenuOpen: false,
   search: '',
   isVisibleSearch: false,
};

interface Props {
   children: React.ReactNode;
}

const UIProvider = ({ children }: Props) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const toggleSideMenu = () => {
      dispatch({ type: 'UI - ToggleMenu' });
   };

   const changeSearchTerm = (searchTerm: string) => {
      dispatch({ type: 'UI - ChangeSearchTerm', payload: searchTerm });
   };

   const toggleSearch = () => {
      dispatch({ type: 'UI - ToggleSearch' });
   };

   const UIMemo = useMemo(
      () => ({
         ...state,

         //Methods
         toggleSideMenu,
         changeSearchTerm,
         toggleSearch,
      }),
      [state]
   );

   return <UIContext.Provider value={UIMemo}>{children}</UIContext.Provider>;
};

export default UIProvider;
