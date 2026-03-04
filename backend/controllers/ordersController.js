import pool from '../config/db.js'

const createOrder = async (req, res) => {
  const { customer_name, address, phone, total_price, items } = req.body

  try {
    // 1. Insert ke tabel orders
    const orderResult = await pool.query(
      `INSERT INTO orders (customer_name, address, phone, total_price)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [customer_name, address, phone, total_price]
    )

    const orderId = orderResult.rows[0].id

    // 2. Insert setiap item ke tabel order_items
    for (const item of items) {
      await pool.query(
        `INSERT INTO order_items (order_id, meal_id, meal_name, price, quantity)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.meal_id, item.meal_name, item.price, item.quantity]
      )
    }

    res.status(201).json({ message: 'Order berhasil dibuat', orderId })
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat order', error: error.message })
  }
}
const getOrders = async (req, res) => {
  try {
    const ordersResult = await pool.query(
      `SELECT * FROM orders ORDER BY created_at DESC`
    )

    const orders = await Promise.all(
      ordersResult.rows.map(async (order) => {
        const itemsResult = await pool.query(
          `SELECT * FROM order_items WHERE order_id = $1`,
          [order.id]
        )
        return { ...order, items: itemsResult.rows }
      })
    )

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil orders', error: error.message })
  }
}

export default {createOrder, getOrders}