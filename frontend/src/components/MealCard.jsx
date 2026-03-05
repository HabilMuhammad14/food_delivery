import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function MealCard({ meal }) {
  const { addToCart } = useCart()
  const price = 35000

  const handleAddToCart = () => {
    addToCart({
      meal_id: meal.idMeal,
      meal_name: meal.strMeal,
      price: price,
    })
  }

  return (
    <div style={styles.card}>
      <img src={meal.strMealThumb} alt={meal.strMeal} style={styles.image} />
      <div style={styles.body}>
        <h3 style={styles.name}>{meal.strMeal}</h3>
        <p style={styles.price}>Rp {price.toLocaleString('id-ID')}</p>
        <div style={styles.actions}>
          <Link to={`/meal/${meal.idMeal}`} style={styles.detailBtn}>Lihat Detail</Link>
          <button onClick={handleAddToCart} style={styles.cartBtn}>+ Keranjang</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  body: {
    padding: '16px',
  },
  name: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '6px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    fontSize: '14px',
    color: '#ff6b35',
    fontWeight: '600',
    marginBottom: '12px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  detailBtn: {
    flex: 1,
    padding: '8px 0',
    textAlign: 'center',
    borderRadius: '20px',
    border: '2px solid #ff6b35',
    color: '#ff6b35',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
  },
  cartBtn: {
    flex: 1,
    padding: '8px 0',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#ff6b35',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}