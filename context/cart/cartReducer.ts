import { CartState } from '.';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct}

export const CartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return {
        ...state,
      };

    default:
      return state;
  }
};
