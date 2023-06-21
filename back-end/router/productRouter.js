import express from "express";
import {traverse,creatAProduct} from '../controlers/productControler.js'
import {upload} from '../middleware/multer.js'

const productRouter = express.Router();


productRouter.get('/',traverse);
productRouter.post('/create',upload.array('images'),creatAProduct);

export default productRouter;