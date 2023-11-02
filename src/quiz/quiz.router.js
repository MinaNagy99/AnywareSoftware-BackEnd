import { verifyToken } from "../../middleWare/veriftToken.js";
import { allowedTo } from "../../middleWare/allowedTo.js";
import { validation } from "../../middleWare/validation.js";
import * as quiz from "./quiz.controller.js";
import {
  addQuizSchema,
  checkQuizIdSchema,
  editeQuizSchema
} from "./quiz.validation.js";
import { Router } from "express";

const quizRouter = Router();
quizRouter
  .route("/")
  .get(verifyToken, allowedTo("student", "teacher"), quiz.getAllQuiz)
  .post(
    verifyToken,
    allowedTo("teacher"),
    validation(addQuizSchema),
    quiz.addQuiz
  );

quizRouter
  .route("/:id")
  .get(
    verifyToken,
    allowedTo("student", "teacher"),
    validation(checkQuizIdSchema),
    quiz.getSpasificQuiz
  )
  .put(
    verifyToken,
    allowedTo("teacher"),
    validation(editeQuizSchema),
    quiz.editQuiz
  )
  .delete(
    verifyToken,
    allowedTo("teacher"),
    validation(checkQuizIdSchema),
    quiz.deleteQuiz
  );

export default quizRouter;
