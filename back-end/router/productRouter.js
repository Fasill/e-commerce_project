import express from "express";
import {allTraverse,creatAProduct,search,cartTraverse} from '../controlers/productControler.js'
import {upload} from '../middleware/multer.js'

const productRouter = express.Router();

productRouter.get('/cart',cartTraverse);
productRouter.get('/',allTraverse);
productRouter.post('/add',allTraverse);
productRouter.delete('/remove/:id',allTraverse);
productRouter.put('/update/;id',allTraverse);

productRouter.post('/',search);
productRouter.post('/create',upload.array('images'),creatAProduct);

export default productRouter;