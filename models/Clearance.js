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
    default: "",
  },
  administrationText: {
    type: String,
    default: "",
  },
  administrationCleared: {
    type: Boolean,
    default: false,
  },
  libraryPic: {
    type: String,
    default: "",
  },
  libraryText: {
    type: String,
    default: "",
  },
  libraryCleared: {
    type: Boolean,
    default: false,
  },
  sportsPic: {
    type: String,
    default: "",
  },
  sportsText: {
    type: String,
    default: "",
  },
  sportsCleared: {
    type: Boolean,
    default: false,
  },
  financePic: {
    type: String,
    default: "",
  }, 
  financeText: {
    type: String,
    default: "",
  }, 
  financeCleared: {
    type: Boolean,
    default: false,
  },
  classTeacherPic: {
    type: String,
    default: "",
  },
  classTeacherText: {
    type: String,
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
