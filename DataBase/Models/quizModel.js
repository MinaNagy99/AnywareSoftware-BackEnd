import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  quizName: { type: String, require: true },
  topic: { type: String, require: true },
  quizDate: { type: Date },
  course: { type: mongoose.Types.ObjectId, ref: "course" },
  createdBy:{type:mongoose.Types.ObjectId,ref:"user"}
});
const quizModel = mongoose.model("quiz", quizSchema);

export default quizModel;
