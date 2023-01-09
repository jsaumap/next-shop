import { useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';

import Cookie from  'js-cookie'
import { CartContext, CartReducer } from './';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

interface Props {
  children?: React.ReactElement;
}

const Cart_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(CartReducer, Cart_INITIAL_STATE);


  useEffect(() => {
    try {
      const cookiesProduct = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: cookiesProduct})
    } catch (error) {
      dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: []})

    }
  }, [])


  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart])

  useEffect(() => {

    const numberOfItems =  state.cart.reduce((prev, current) => current.quantity + prev, 0)

    const subTotal = state.cart.reduce((prev, current) => (current.price*current.quantity) + prev,0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.15);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }
    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary})

    console.log(orderSummary)
  }, [state.cart])




  const updateProductsInCart = (product: ICartProduct) => {
    const productInCart = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCart)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product]
      });

    //Acumulate

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change product quantity', payload: product})
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product})

  }



  return (
    <CartContext.Provider
      value={{
        ...state,


        //Methods
        updateProductsInCart,
        updateCartQuantity,
        removeCartProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
