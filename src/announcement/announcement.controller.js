import announcementModel from "../../DataBase/Models/announcementModel.js";
import userModel from "../../DataBase/Models/userModel.js";
import { catchAsyncError } from "../../middleWare/cathAsyncError.js";
import { AppError } from "../../utilits/AppError.js";

let addAnnouncement = catchAsyncError(async (req, res) => {
  let createdBy = req.user._id;
  let newAnnouncement = await new announcementModel({
    ...req.body,
    createdBy
  }).populate("createdBy");
  await newAnnouncement.save();
  await userModel.updateMany(
    {},
    { $push: { announcements: newAnnouncement._id } }
  );
  res.status(200).send({ message: "success", data: newAnnouncement });
});

let editAnnouncement = catchAsyncError(async (req, res) => {
  let { id } = req.params;
  let announcement = await announcementModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .populate("createdBy");
  res.status(200).send({ message: "success", data: announcement });
});

let deleteAnnouncement = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let announcement = await announcementModel.findByIdAndDelete(id);
  await userModel.updateMany(
    {},
    { $pull: { announcements: announcement._id } }
  );
  if (!announcement) return next(new AppError("not found this announcement "));
  res.status(200).send({ messgae: "success" });
});

let getAllAnnouncement = catchAsyncError(async (req, res, next) => {
  let annoucements = await announcementModel
    .find()
    .populate([{ path: "createdBy", populate: { path: "course" } }]);
  annoucements.map((ann) => {
    return (ann.createdBy.profileImg = `${process.env.imgURL}/${ann.createdBy.profileImg}`);
  });
  if (!annoucements) return next(new AppError("not found any announcement"));
  res.status(200).send({ messgae: "success", data: annoucements });
});

let getSpasificAnnouncement = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let announcement = await announcementModel.findById(id).populate("createdBy");
  if (!announcement)
    return next(new AppError("not found this announcement", 404));
  res.status(200).send({ message: "success", data: announcement });
});

export {
  addAnnouncement,
  getAllAnnouncement,
  getSpasificAnnouncement,
  editAnnouncement,
  deleteAnnouncement
};
