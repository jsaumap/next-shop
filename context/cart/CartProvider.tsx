import { useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, CartReducer } from './';

export interface CartState {
  cart: ICartProduct[];
}

interface Props {
  children?: React.ReactElement
}

const Cart_INITIAL_STATE: CartState = {
  cart: []
};

export const CartProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(CartReducer, Cart_INITIAL_STATE)

  return (
    <CartContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
