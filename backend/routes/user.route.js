import express from 'express'
import  { likeProduct, updateCart, handler } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/likeProduct', likeProduct);
router.post('/updateCart', updateCart);
router.post('/handler', handler)

export default router;