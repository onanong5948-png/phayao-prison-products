import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'phayao_prison_products_cart_v1'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => {
    const add = (id, qty = 1) =>
      setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }))
    const decrease = (id, qty = 1) =>
      setItems((prev) => {
        const next = (prev[id] || 0) - qty
        if (next <= 0) {
          const copy = { ...prev }
          delete copy[id]
          return copy
        }
        return { ...prev, [id]: next }
      })
    const remove = (id) =>
      setItems((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
    const clear = () => setItems({})
    const count = Object.values(items).reduce((a, b) => a + b, 0)
    return { items, add, decrease, remove, clear, count }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
