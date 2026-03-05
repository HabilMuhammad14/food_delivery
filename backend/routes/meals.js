import express from 'express';
import mealsController from '../controllers/mealsController.js'
const router = express.Router()

router.get('/categories', mealsController.getCategories);
router.get('/category/:category', mealsController.getMealsByCategory);
router.get('/search', mealsController.searchMeals);
router.get('/:id', mealsController.getMealById);

export default router;