import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    titleAnnouncement:{type:String,require:true},
    description:{type:String,require:true},
    createdBy:{type:mongoose.Types.ObjectId,ref:'user'},
    date:{type:Date}

})
const announcementModel = mongoose.model('announcement',announcementSchema)

export default announcementModel