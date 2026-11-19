import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BUILTIN_PRODUCTS, CATEGORIES, Product } from './catalog';

export type ListItem = { id: string; name: string; emoji: string; categoryId: string; qty: number; checked: boolean };
export type ShoppingList = { id: string; title: string; createdAt: number; items: ListItem[] };

type State = {
  basket: Record<string, number>; // productId -> quantity
  customProducts: Product[];
  lists: ShoppingList[];
};

const STORAGE_KEY = 'home-needs-state-v1';
const initial: State = { basket: {}, customProducts: [], lists: [] };

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function useStoreValue() {
  const [state, setState] = useState<State>(initial);
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) setState({ ...initial, ...JSON.parse(json) });
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
    }, 250);
  }, [state, loaded]);

  const products = useMemo(() => [...BUILTIN_PRODUCTS, ...state.customProducts], [state.customProducts]);
  const productById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);

  const setQty = (productId: string, qty: number) =>
    setState((s) => {
      const basket = { ...s.basket };
      if (qty <= 0) delete basket[productId];
      else basket[productId] = qty;
      return { ...s, basket };
    });

  const addCustomProduct = (name: string, categoryId: string) => {
    const p: Product = { id: 'custom-' + uid(), name: name.trim(), emoji: '📝', categoryId, custom: true };
    setState((s) => ({ ...s, customProducts: [...s.customProducts, p], basket: { ...s.basket, [p.id]: 1 } }));
  };

  const removeCustomProduct = (id: string) =>
    setState((s) => {
      const basket = { ...s.basket };
      delete basket[id];
      return { ...s, basket, customProducts: s.customProducts.filter((p) => p.id !== id) };
    });

  const clearBasket = () => setState((s) => ({ ...s, basket: {} }));

  /** Turns the basket into a new checklist, ordered by supermarket aisle (category order). */
  const createListFromBasket = (): string | null => {
    const order = new Map(CATEGORIES.map((c, i) => [c.id, i]));
    const items: ListItem[] = Object.entries(state.basket)
      .map(([pid, qty]) => {
        const p = productById.get(pid);
        return p ? { id: uid() + pid, name: p.name, emoji: p.emoji, categoryId: p.categoryId, qty, checked: false } : null;
      })
      .filter((x): x is ListItem => x !== null)
      .sort((a, b) => (order.get(a.categoryId) ?? 99) - (order.get(b.categoryId) ?? 99) || a.name.localeCompare(b.name));
    if (!items.length) return null;
    const d = new Date();
    const list: ShoppingList = {
      id: uid(),
      title: `Shopping ${d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}`,
      createdAt: d.getTime(),
      items,
    };
    setState((s) => ({ ...s, basket: {}, lists: [list, ...s.lists] }));
    return list.id;
  };

  const updateList = (listId: string, fn: (l: ShoppingList) => ShoppingList) =>
    setState((s) => ({ ...s, lists: s.lists.map((l) => (l.id === listId ? fn(l) : l)) }));

  const toggleItem = (listId: string, itemId: string) =>
    updateList(listId, (l) => ({ ...l, items: l.items.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i)) }));

  const resetList = (listId: string) => updateList(listId, (l) => ({ ...l, items: l.items.map((i) => ({ ...i, checked: false })) }));

  const deleteList = (listId: string) => setState((s) => ({ ...s, lists: s.lists.filter((l) => l.id !== listId) }));

  /** Put the unchecked items of a list back into the basket (to re-use or edit them). */
  const loadListIntoBasket = (listId: string, onlyUnchecked: boolean) => {
    const list = state.lists.find((l) => l.id === listId);
    if (!list) return;
    setState((s) => {
      const basket = { ...s.basket };
      const customProducts = [...s.customProducts];
      for (const it of list.items) {
        if (onlyUnchecked && it.checked) continue;
        let p = products.find((x) => x.name === it.name && x.categoryId === it.categoryId) ?? customProducts.find((x) => x.name === it.name && x.categoryId === it.categoryId);
        if (!p) {
          p = { id: 'custom-' + uid(), name: it.name, emoji: it.emoji, categoryId: it.categoryId, custom: true };
          customProducts.push(p);
        }
        basket[p.id] = Math.max(basket[p.id] ?? 0, it.qty);
      }
      return { ...s, basket, customProducts };
    });
  };

  return {
    ...state,
    loaded,
    products,
    productById,
    setQty,
    addCustomProduct,
    removeCustomProduct,
    clearBasket,
    createListFromBasket,
    toggleItem,
    resetList,
    deleteList,
    loadListIntoBasket,
  };
}

type Store = ReturnType<typeof useStoreValue>;
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const value = useStoreValue();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore must be used inside StoreProvider');
  return v;
}

export function listToText(list: ShoppingList) {
  const lines = [`🛒 ${list.title}`, ''];
  let lastCat = '';
  for (const it of list.items) {
    if (it.categoryId !== lastCat) {
      const c = CATEGORIES.find((x) => x.id === it.categoryId);
      if (lastCat) lines.push('');
      lines.push(`${c?.emoji ?? ''} ${c?.name ?? 'Other'}`.trim());
      lastCat = it.categoryId;
    }
    lines.push(`${it.checked ? '☑' : '☐'} ${it.name}${it.qty > 1 ? ` × ${it.qty}` : ''}`);
  }
  return lines.join('\n');
}
