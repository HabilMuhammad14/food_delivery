import { Link } from "react-router-dom";
import {useCart} from '../context/CartContext.jsx';


export default function Navbar() {
    const {cart} = useCart()
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>🍔 FoodDash</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/menu" style={styles.link}>Menu</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
        <Link to="/cart" style={styles.cartBtn}>
          🛒 <span style={styles.badge}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 32px',
    backgroundColor: '#ff6b35',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
  },
  cartBtn: {
    position: 'relative',
    backgroundColor: '#fff',
    color: '#ff6b35',
    padding: '8px 16px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  badge: {
    backgroundColor: '#ff6b35',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 7px',
    fontSize: '12px',
    fontWeight: 'bold',
  }
}