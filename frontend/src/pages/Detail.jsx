import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { getMealById } from '../api/index.js'

export default function Detail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true)
      const data = await getMealById(id)
      setMeal(data.meals[0])
      setLoading(false)
    }
    fetchMeal()
  }, [id])

  const handleAddToCart = () => {
    addToCart({
      meal_id: meal.idMeal,
      meal_name: meal.strMeal,
      price: 35000,
    })
  }

  if (loading) return <p style={styles.loading}>Loading...</p>
  if (!meal) return <p style={styles.loading}>Makanan tidak ditemukan.</p>

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={meal.strMealThumb} alt={meal.strMeal} style={styles.image} />
        <div style={styles.body}>
          <div style={styles.tags}>
            <span style={styles.tag}>🍽️ {meal.strCategory}</span>
            <span style={styles.tag}>🌍 {meal.strArea}</span>
          </div>
          <h1 style={styles.title}>{meal.strMeal}</h1>
          <p style={styles.price}>Rp 35.000</p>
          <button onClick={handleAddToCart} style={styles.cartBtn}>
            + Tambah ke Keranjang
          </button>
          <div style={styles.divider} />
          <h2 style={styles.sectionTitle}>Cara Memasak</h2>
          <p style={styles.instructions}>{meal.strInstructions}</p>
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
  card: {
    display: 'flex',
    gap: '48px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
    padding: '32px',
  },
  image: {
    width: '380px',
    height: '380px',
    objectFit: 'cover',
    borderRadius: '16px',
    flexShrink: 0,
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  tags: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
  },
  tag: {
    backgroundColor: '#fff0e8',
    color: '#ff6b35',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: '20px',
  },
  cartBtn: {
    alignSelf: 'flex-start',
    padding: '12px 32px',
    backgroundColor: '#ff6b35',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,107,53,0.3)',
  },
  divider: {
    height: '1px',
    backgroundColor: '#ffe0d0',
    margin: '24px 0',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  instructions: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.8',
    overflowY: 'auto',
    maxHeight: '220px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
    marginTop: '100px',
  },
}