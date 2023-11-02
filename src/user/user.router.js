import { Router } from "express";
import { verifyToken } from "../../middleWare/veriftToken.js";
import { allowedTo } from "../../middleWare/allowedTo.js";
import * as student from "./user.controller.js";

const userRouter = Router()
userRouter.route('/').get(verifyToken,allowedTo('teacher'),student.getAllStudents)
userRouter.route('/spasificUser').get(verifyToken,allowedTo('student'),student.getSpasificStudent)

export default userRouter