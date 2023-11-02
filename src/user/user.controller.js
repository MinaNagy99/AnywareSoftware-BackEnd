import userModel from "../../DataBase/Models/userModel.js";
import { catchAsyncError } from "../../middleWare/cathAsyncError.js";
import { AppError } from "../../utilits/AppError.js";

let getAllStudents = catchAsyncError(async (req, res, next) => {
  let students = await userModel.find({ role: "student" }).populate([
    { path: "announcements", select: "-createdBy" },
    { path: "quizes", populate: { path: " " } },
    { path: "course", select: "courseName" }
  ]);
  students.map((user) => {
    user.profileImg = `${process.env.imgURL}/${user.profileImg}`;
  });

  if (!students) return next(new AppError("not found any students", 404));
  res.status(200).send({ message: "success", data: students });
});

let getSpasificStudent = catchAsyncError(async (req, res, next) => {
  let id = req.user._id;
  let student = await userModel.findById(id).populate([
    { path: "announcements", select: "-createdBy" },
    { path: "quizes", populate: { path: "courseId" } }
  ]);
  if (!student) return next(new AppError("not fount this srudent", 404));
  res.status(200).send({ message: "success", data: student });
});

export { getAllStudents, getSpasificStudent };
