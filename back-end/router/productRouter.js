import express from "express";
import {traverse,creatAProduct,search} from '../controlers/productControler.js'
import {upload} from '../middleware/multer.js'

const productRouter = express.Router();


productRouter.get('/',traverse);
//this is for searching 
productRouter.post('/',search);
productRouter.post('/create',upload.array('images'),creatAProduct);

export default productRouter;