import { createContext, useState, useContext } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (meal) => {
    setCart((prevCart) => {
      // Cek apakah meal sudah ada di cart
      const existing = prevCart.find((item) => item.meal_id === meal.meal_id)

      if (existing) {
        // Kalau sudah ada, tambah quantity
        return prevCart.map((item) =>
          item.meal_id === meal.meal_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Kalau belum ada, tambah item baru dengan quantity 1
        return [...prevCart, { ...meal, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (mealId) => {
    setCart((prevCart) => prevCart.filter((item) => item.meal_id !== mealId))
  }

  const updateQuantity = (mealId, quantity) => {
    if (quantity === 0) {
      removeFromCart(mealId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.meal_id === mealId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook supaya lebih mudah dipakai di component lain
export function useCart() {
  return useContext(CartContext)
}