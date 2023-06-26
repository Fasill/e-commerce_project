import express from 'express';
import {requireAuth} from '../middleware/JWTmidleware'
import {signup,additionalForms,signin,verifyToken} from '../controlers/userControlers.js'

const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/signup/payment",additionalForms)
userRouter.post("/signin",signin)
userRouter.post("/",requireAuth,verifyToken)

export default userRouter