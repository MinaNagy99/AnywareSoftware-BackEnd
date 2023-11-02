import userModel from "../../DataBase/Models/userModel.js";
import { catchAsyncError } from "../../middleWare/cathAsyncError.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utilits/AppError.js";

const register = catchAsyncError(async (req, res, next) => {
  const { userName, password } = req.body;
  console.log(req.file);
  if (req.file) {
    req.body.profileImg = req.file.filename;
  }
  let oldUser = await userModel.findOne({ userName });
  if (oldUser) return next(new AppError("user Already Existed", 402));
  bcrypt.hash(password, 8, async function (err, hash) {
    req.body.password = hash;
    let newStudent = await new userModel(req.body);
    await newStudent.save();
    res.status(200).send({ message: "success", data: newStudent });
  });
});

const login = catchAsyncError(async (req, res, next) => {
  const { userName, password } = req.body;
  const student = await userModel.findOne({ userName });
  bcrypt.compare(password, student.password).then(function (result) {
    !result && next(new AppError("incorrect userName or Password", 404));
  });
  res.status(200).send({ message: "success", token: req.token });
});

export { login, register };
