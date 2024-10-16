import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/products', upload.single('image'), createProduct);
router.get('/products', getProducts);

export default router;