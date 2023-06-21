import express from 'express';
import {signup,additionalForms,signin} from '../controlers/userControlers.js'

const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/signup/payment",additionalForms)
userRouter.post("/signin",signin)

export default userRouter