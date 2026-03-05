import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { createOrder } from '../api/index.js'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    customer_name: '',
    address: '',
    phone: ''
  })

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleOrder = async () => {
    if (!form.customer_name || !form.address || !form.phone) {
      alert('Mohon lengkapi semua data!')
      return
    }
    if (cart.length === 0) {
      alert('Keranjang masih kosong!')
      return
    }

    const orderData = {
      customer_name: form.customer_name,
      address: form.address,
      phone: form.phone,
      total_price: totalPrice,
      items: cart.map((item) => ({
        meal_id: item.meal_id,
        meal_name: item.meal_name,
        price: item.price,
        quantity: item.quantity,
      }))
    }

    try {
      await createOrder(orderData)
      clearCart()
      navigate('/orders')
    } catch (error) {
      alert('Gagal membuat order, coba lagi!')
    }
  }

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyIcon}>🛒</p>
        <h2 style={styles.emptyTitle}>Keranjang Kosong</h2>
        <p style={styles.emptyDesc}>Yuk tambahkan makanan favoritmu!</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Keranjang Belanja 🛒</h1>
      <div style={styles.layout}>

        {/* List Item Cart */}
        <div style={styles.cartList}>
          {cart.map((item) => (
            <div key={item.meal_id} style={styles.cartItem}>
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.meal_name}</h3>
                <p style={styles.itemPrice}>Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              <div style={styles.itemActions}>
                <button onClick={() => updateQuantity(item.meal_id, item.quantity - 1)} style={styles.qtyBtn}>-</button>
                <span style={styles.qty}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.meal_id, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                <button onClick={() => removeFromCart(item.meal_id)} style={styles.removeBtn}>🗑️</button>
              </div>
              <p style={styles.itemTotal}>
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </p>
            </div>
          ))}

          {/* Total */}
          <div style={styles.totalWrapper}>
            <span style={styles.totalLabel}>Total Pembayaran</span>
            <span style={styles.totalPrice}>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Form Checkout */}
        <div style={styles.form}>
          <h2 style={styles.formTitle}>Data Pengiriman</h2>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={form.customer_name}
            onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Nomor HP"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={styles.input}
          />
          <textarea
            placeholder="Alamat Lengkap"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            style={styles.textarea}
          />
          <button onClick={handleOrder} style={styles.orderBtn}>
            Pesan Sekarang 🚀
          </button>
        </div>

      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '40px 80px',
    backgroundColor: '#fff9f6',
    minHeight: '100vh',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '32px',
  },
  layout: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
  },
  cartList: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '16px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  itemPrice: {
    fontSize: '13px',
    color: '#888',
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  qtyBtn: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '2px solid #ff6b35',
    backgroundColor: '#fff',
    color: '#ff6b35',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
  },
  qty: {
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    marginLeft: '8px',
  },
  itemTotal: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#ff6b35',
    minWidth: '120px',
    textAlign: 'right',
  },
  totalWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    marginTop: '8px',
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  totalPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ff6b35',
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #ffe0d0',
    fontSize: '14px',
    outline: 'none',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #ffe0d0',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
  },
  orderBtn: {
    padding: '14px',
    backgroundColor: '#ff6b35',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,107,53,0.3)',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  emptyDesc: {
    fontSize: '16px',
    color: '#888',
  },
}