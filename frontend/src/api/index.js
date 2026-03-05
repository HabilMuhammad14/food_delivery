import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

export const getCategories = async () => {
  const response = await api.get('/api/meals/categories')
  return response.data
}

export const getMealsByCategory = async (category) => {
  const response = await api.get(`/api/meals/category/${category}`)
  return response.data
}

export const getMealById = async (id) => {
  const response = await api.get(`/api/meals/${id}`)
  return response.data
}

export const searchMeals = async (name) => {
  const response = await api.get(`/api/meals/search?name=${name}`)
  return response.data
}

export const createOrder = async (orderData) => {
  const response = await api.post('/api/orders', orderData)
  return response.data
}

export const getOrders = async () => {
  const response = await api.get('/api/orders')
  return response.data
}