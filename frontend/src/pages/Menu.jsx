import React from 'react'
import { getCategories, getMealsByCategory, searchMeals } from '../api/index.js'
import MealCard from '../components/MealCard.jsx'

export default function Menu() {
  const [categories, setCategories] = React.useState([]);
  const [meals, setMeals] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
  const fetchCategories = async () => {
    setLoading(true)
    const data = await getCategories()
    setCategories(data.categories) // data dari TheMealDB ada di .categories
    setLoading(false)
  }
  fetchCategories()
  }, [])
  React.useEffect(() => {
    if (!selectedCategory) return
    const fetchMeals = async () => {
      setLoading(true)
      const data = await getMealsByCategory(selectedCategory)
      setMeals(data.meals)
      setLoading(false)
    }
    fetchMeals()
  }, [selectedCategory])
  const handleSearch = async () => {
    if (!search) return
    setLoading(true)
    const data = await searchMeals(search)
    setMeals(data.meals)
    setLoading(false)
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Menu 🍽️</h1>

      {}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Cari makanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchBtn}>Cari</button>
      </div>

      {/* Kategori */}
      <div style={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            onClick={() => setSelectedCategory(cat.strCategory)}
            style={{
              ...styles.catBtn,
              ...(selectedCategory === cat.strCategory ? styles.catBtnActive : {})
            }}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>

      {/* Meals Grid */}
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <div style={styles.grid}>
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
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
    marginBottom: '24px',
  },
  searchWrapper: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
  },
  searchInput: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '30px',
    border: '2px solid #ffe0d0',
    fontSize: '15px',
    outline: 'none',
  },
  searchBtn: {
    padding: '12px 28px',
    backgroundColor: '#ff6b35',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '32px',
  },
  catBtn: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #ff6b35',
    backgroundColor: '#fff',
    color: '#ff6b35',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
  },
  catBtnActive: {
    backgroundColor: '#ff6b35',
    color: '#fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '24px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
    marginTop: '60px',
  },
}