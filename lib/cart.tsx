'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

export type CartItem = {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  quantity: number;
};

type State = { items: CartItem[]; isOpen: boolean };

type Action =
  | { type: 'ADD'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE'; id: number }
  | { type: 'UPDATE_QTY'; id: number; qty: number }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'LOAD'; items: CartItem[] };

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const idx = state.items.findIndex(i => i.id === action.payload.id);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
        return { items, isOpen: true };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }], isOpen: true };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QTY':
      if (action.qty < 1) return { ...state, items: state.items.filter(i => i.id !== action.id) };
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, quantity: action.qty } : i) };
    case 'OPEN':  return { ...state, isOpen: true };
    case 'CLOSE': return { ...state, isOpen: false };
    case 'LOAD':  return { ...state, items: action.items };
    default:      return state;
  }
}

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: string;
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reduce, { items: [], isOpen: false });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jec-cart');
      if (saved) dispatch({ type: 'LOAD', items: JSON.parse(saved) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem('jec-cart', JSON.stringify(state.items));
  }, [state.items, ready]);

  const count = state.items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = '$' + state.items.reduce((s, i) => s + i.priceNum * i.quantity, 0).toFixed(2);

  return (
    <Ctx.Provider value={{
      items: state.items,
      count,
      subtotal,
      isOpen: state.isOpen,
      addItem:    p   => dispatch({ type: 'ADD', payload: p }),
      removeItem: id  => dispatch({ type: 'REMOVE', id }),
      updateQty:  (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }),
      openCart:   ()  => dispatch({ type: 'OPEN' }),
      closeCart:  ()  => dispatch({ type: 'CLOSE' }),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
