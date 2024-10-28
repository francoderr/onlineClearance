import express from "express";

import { editUser, getUsers } from "../controllers/userController.js";
import {
  beginClearance,
  clearDepartment,
  uploadPics,
} from "../controllers/clearanceController.js";
import { createToken, stkPush } from "../controllers/paymentController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

//user routes
router.get("/getUsers", isAdmin,getUsers);
router.post("/editUser", isAdmin, editUser);

//payment routes
router.post("/stkPush", createToken, stkPush);

//clearance routes
router.post("/beginClearance", isAuthenticated, beginClearance);
router.post("/uploadPics", isAuthenticated, uploadPics);
router.post("/clearDepartment", isAdmin, clearDepartment);

export default router;
