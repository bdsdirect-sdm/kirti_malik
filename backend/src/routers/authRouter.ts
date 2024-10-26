import express from 'express';
import { RegisterValidator } from '../middlewares/validator';
import { uploadMiddleware } from '../middlewares/multer';
import { addProduct, deleteProduct, getProduct, getRetailer, loginUser, productDetails, registerRetailer } from '../controllers/authController';


const router = express.Router();


router.post('/registerRetailer', uploadMiddleware, RegisterValidator, registerRetailer);
router.post('/login', loginUser);
router.get('/getProducts/:retailerId', getProduct)
router.post('/addProducts/:retailerId',uploadMiddleware,addProduct)
router.get('/productDetails/:productId',productDetails)
router.delete('/deleteProduct/:productId',deleteProduct)
router.get('/retailerdetails/:retailerId', getRetailer)



export default router;
