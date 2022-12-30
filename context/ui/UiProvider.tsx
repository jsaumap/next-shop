import { useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
  isMenuOpen: boolean;
}

interface Props {
  children?: React.ReactElement
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false
};

export const UiProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
  const toggleSideMenu = () => {
    dispatch({type: '[UI] - ToggleMenu'})
  }

  return (
    <UiContext.Provider
      value={{
        ...state,
        // Methods
        toggleSideMenu
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
