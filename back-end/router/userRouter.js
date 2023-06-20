import express from 'express';
import {signup,additionalForms} from '../controlers/userControlers.js'

const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/signup/payment",additionalForms)


export default userRouter