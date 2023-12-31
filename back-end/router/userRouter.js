import express from 'express';
import {requireAuth} from '../middleware/JWTmidleware'
import {signup,additionalForms,signin,verifyToken} from '../controlers/userControlers.js'
import {Profile} from '../controlers/userControlers'

const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/signup/payment",additionalForms)
userRouter.post("/signin",signin)
userRouter.post("/verify",requireAuth,verifyToken)

userRouter.get("/",(req,res)=>{
  res.json({message:"connected"})
})
userRouter.post("/Profile",Profile)
export default userRouter