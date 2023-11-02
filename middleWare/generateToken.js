import Jwt from "jsonwebtoken";
import userModel from "../DataBase/Models/userModel.js";
import { config } from "dotenv";
import { catchAsyncError } from "./cathAsyncError.js";
import { AppError } from "../utilits/AppError.js";

config()
export let generateToken = catchAsyncError(async (req, res, next) => {
  const { userName } = req.body;
  console.log(userName);
  const user = await userModel.findOne({ userName });
  console.log(user);
  if (!user) return next(new AppError('not Fount the student',404))
  const token = Jwt.sign({ _id:user._id }, process.env.TOKEN_PASSWORD);
  req.token = token;
  next();
});
