import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, require: true, unique: true },
  password: {
    type: String,
    require: true,
    min: [8, "password must be greater than 8"]
  },
  profileImg: { type: String },
  quizes: [{ type: mongoose.Types.ObjectId, ref: "quiz" }],
  announcements: [{ type: mongoose.Types.ObjectId, ref: "announcement" }],
  role: { type: String, enum: ["teacher", "student"], default: "student" },
  course:{type:mongoose.Types.ObjectId,ref:'course'}
});
const userModel = mongoose.model("user", userSchema);
userSchema.pre(["find", "fineOne"], function () {
  this.populate("announcements", "");
});


export default userModel;
