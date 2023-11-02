import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName:{type:String,require:true,unique:true},
    courseContent:{type:String,require:true},
    teacher:{type:mongoose.Types.ObjectId,ref:'user'}
})
const courseModel = mongoose.model('course',courseSchema)

export default courseModel