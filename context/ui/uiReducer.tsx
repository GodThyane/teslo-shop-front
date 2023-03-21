import { UIState } from './';

type UIActionType =
   | { type: 'UI - ToggleMenu' }
   | { type: 'UI - ChangeSearchTerm'; payload: string }
   | { type: 'UI - ToggleSearch' };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
   switch (action.type) {
      case 'UI - ToggleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen,
         };
      case 'UI - ChangeSearchTerm':
         return {
            ...state,
            search: action.payload,
         };
      case 'UI - ToggleSearch':
         return {
            ...state,
            isVisibleSearch: !state.isVisibleSearch,
         };
      default:
         return state;
   }
};
