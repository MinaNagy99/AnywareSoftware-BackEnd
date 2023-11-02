import  jwt  from "jsonwebtoken"
import userModel from "../DataBase/Models/userModel.js"
import { AppError } from "../utilits/AppError.js"
import { catchAsyncError } from "./cathAsyncError.js"

export const verifyToken = catchAsyncError(async(req,res,next)=>{
    let {token}= req.headers
    if (!token) return next(new AppError('token nor provider',404))
    let decoded = await jwt.verify(token,process.env.TOKEN_PASSWORD)
    let user = await userModel.findById(decoded._id)
    req.user = user
    next()
    
})