import courseModel from "../../DataBase/Models/courseModel.js";
import { catchAsyncError } from "../../middleWare/cathAsyncError.js";
import { AppError } from "../../utilits/AppError.js";

let addCourse = catchAsyncError(async (req, res, next) => {
  let { courseName, courseContent ,teacher } = req.body;
  let oldCourse = await courseModel.findOne({ courseName });
  console.log(oldCourse);
  if (oldCourse) return next(new AppError("course aready existed", 400));
  let newCourse = await new courseModel(req.body).populate('teacher');
  await newCourse.save();
  res.status(200).send({ message: "success", data: newCourse });
});

let getAllCourses = catchAsyncError(async (req, res, next) => {
  let courses = await courseModel.find();
  if (!courses) return next(new AppError("not Found any course", 404));
  res.status(200).send({ message: "success", data: courses });
});

let getSpasificCourse = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let course = await courseModel.findById(id);
  if (!course) return next(new AppError("course not found", 404));
  res.status(200).send({ message: "success", data: course });
});
let editCourse = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let course = await courseModel.findByIdAndUpdate(id, req.body, { new: true });
  if (!course) return next(new AppError("course not found", 404));
  res.status(200).send({ message: "success", data: course });
});

let deleteCourse = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let course = await courseModel.findByIdAndDelete(id);
  if (!course) return next(new AppError("not found this Course"));
  res.status(201).send({message:'success'})
});

export{getAllCourses,getSpasificCourse,deleteCourse,editCourse,addCourse}