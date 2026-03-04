import axios from 'axios'
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

const getCategories = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories.php`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Gagal fetch kategori', error: error.message })
  }
}

const getMealsByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Gagal fetch meals', error: error.message })
  }
}

const getMealById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Gagal fetch detail meal', error: error.message })
  }
}

const searchMeals = async (req, res) => {
  try {
    const { name } = req.query
    const response = await axios.get(`${BASE_URL}/search.php?s=${name}`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Gagal search meals', error: error.message })
  }
}

export default { getCategories, getMealsByCategory, getMealById, searchMeals }