import quizModel from "../../DataBase/Models/quizModel.js";
import userModel from "../../DataBase/Models/userModel.js";
import { catchAsyncError } from "../../middleWare/cathAsyncError.js";
import { AppError } from "../../utilits/AppError.js";

let addQuiz = catchAsyncError(async (req, res, next) => {
  let createdBy = req.user._id;
  let quiz = await new quizModel({ ...req.body, createdBy }).populate([
    {
      path: "createdBy",
      select:"userName"
    },
    {
      path: "course"
    }
  ]);
  await quiz.save();
  await userModel.updateMany({}, { $push: { quizes: quiz._id } });
  res.status(200).send({ message: "success", data: quiz });
});

let getSpasificQuiz = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let quiz = await quizModel.findById(id).populate([
    {
      path: "createdBy",
      select:"userName"
    },
    {
      path: "course"
    }
  ])
  if (!quiz) return next(new AppError("not found this quiz", 404));
  res.status(200).send({ messge: "success", data: quiz });
});

let getAllQuiz = catchAsyncError(async (req, res, next) => {
  let quizs = await quizModel.find().populate([
    {
      path: "createdBy",
      select:"userName"
    },
    {
      path: "course"
    }
  ])
  if (!quizs) return next(new AppError("not found any quiz", 404));
  res.status(200).send({ message: "success", data: quizs });
});

let editQuiz = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let quiz = await quizModel.findByIdAndUpdate(id, req.body, { new: true }).populate([
    {
      path: "createdBy",
      select:"userName"
    },
    {
      path: "course"
    }
  ])
  if (!quiz) return next(new AppError("not found the quiz", 404));
  res.status(200).send({ message: "success", data: quiz });
});

let deleteQuiz = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let quiz = await quizModel.findByIdAndDelete(id);
  await userModel.updateMany({},{$pull:{quizes:quiz._id}})
  if (!quiz) return next(new AppError("not found quiz", 404));
  res.status(200).send({ message: "success" });
});

export { addQuiz, getAllQuiz, getSpasificQuiz, editQuiz, deleteQuiz };
