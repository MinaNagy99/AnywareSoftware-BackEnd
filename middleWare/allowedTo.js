import { AppError } from "../utilits/AppError.js"
import { catchAsyncError } from "./cathAsyncError.js"

export const allowedTo = (...role)=>{
    return catchAsyncError(async(req,res,next)=>{
        if(!role.includes(req.user.role)) return next(new AppError(`you are not authorized you are ${req.user.role}`,404))
        next()
    })
}