import mongoose from "mongoose";

const clearanceSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  administrationPic: {
    type: String,
    // required: true,
    default: "",
  },
  administrationCleared: {
    type: Boolean,
    default: false,
  },
  libraryPic: {
    type: String,
    // required: true,
    default: "",
  },
  libraryCleared: {
    type: Boolean,
    default: false,
  },
  sportsPic: {
    type: String,
    // required: true,
    default: "",
  },
  sportsCleared: {
    type: Boolean,
    default: false,
  },
  financePic: {
    type: String,
    // required: true,
    default: "",
  }, 
  financeCleared: {
    type: Boolean,
    default: false,
  },
  classTeacherPic: {
    type: String,
    // required: true,
    default: "",
  },
  classTeacherCleared: {
    type: Boolean,
    default: false,
  },
  isCleared: {
    type: Boolean,
    default: false,
  },
});

const Clearance = mongoose.model("clearance", clearanceSchema);

export default Clearance;
