import express from "express";
import {allTraverse,creatAProduct,search,cartTraverse,addToCart,removeFromCart,updateCart,payment,webhook} from '../controlers/productControler.js'
import {upload} from '../middleware/multer.js'
import {pay} from "../controlers/payment.js"
const productRouter = express.Router();
productRouter.post('/pay',pay)
productRouter.post('/cart',cartTraverse);
productRouter.post('/cart/add',addToCart);
productRouter.delete('/cart/remove/:productId/:token',removeFromCart);
productRouter.put('/cart/update/:productId',updateCart);

productRouter.get('/',allTraverse);
productRouter.post('/',search);
productRouter.post('/create',upload.array('images'),creatAProduct);
productRouter.post('/webhook',webhook)
export default productRouter;