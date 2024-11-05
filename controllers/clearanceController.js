import ClearanceModel from "../models/Clearance.js";
import UserModel from "../models/User.js";
// import { ObjectId } from "mongodb";

export const beginClearance = async (req, res) => {
  const username = req.user.username;
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({
      Status: "Failed",
      message: "User ID is required!",
    });
  }

  if (!username) {
    return res.status(400).json({
      Status: "Failed",
      message: "User name is required!",
    });
  }

  try {
    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        Status: "Failed",
        message: "User not found!",
      });
    }

    let userd = {
      userId: userId,
    };

    // check if clearance already exists
    const product = await ClearanceModel.findOne(userd);
    if (!product) {
      console.log("Product", product);
      // Add product to cart
      const clearanceItem = new ClearanceModel({
        userId,
        username,
      });

      await clearanceItem.save();
      res.status(200).json({
        Status: "Success",
        message: "Clearance Initiated successfully!",
        clearanceItem: clearanceItem,
      });
    } else {
      return res.status(404).json({
        Status: "Failed",
        message: "Clearance already initiated!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadPics = async (req, res) => {
  const pic = req.body.pic;
  const text = req.body.text || "";
  const userId = req.user._id;
  const val = req.body.value;

  if (!userId) {
    return res.status(400).json({
      Status: "Failed",
      message: "userId required!",
    });
  }

  if (!pic) {
    return res.status(400).json({
      Status: "Failed",
      message: "Picture required!",
    });
  }

  let obj = { 
    [req.body.value]: pic,
    [req.body.value2]: text,
   };

  try {
    const updatedProduct = await ClearanceModel.findOneAndUpdate(
      { userId },
      obj,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        Status: "Failed",
        message: "Clearance details not found!",
      });
    }

    res.status(200).json({
      Status: "Success",
      message: `${val} updated successfully!`,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const clearDepartment = async (req, res) => {
  const action = req.body.action;
  const userId = req.body.userId;
  const val = req.body.value;

  if (!userId) {
    return res.status(400).json({
      Status: "Failed",
      message: "userId required!",
    });
  }

  if (!action) {
    return res.status(400).json({
      Status: "Failed",
      message: "action required!",
    });
  }

  let bool = false

  console.log('action', action)

  if (action === 'activate') {
    bool = true;
  } 

  let obj = { [req.body.value]: bool };

  try {
    const updatedProduct = await ClearanceModel.findOneAndUpdate(
      { userId },
      obj,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        Status: "Failed",
        message: "Clearance details not found!",
      });
    }

    res.status(200).json({
      Status: "Success",
      message: `${val} successfully!`,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const getClearanceInfo = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({
      Status: "Failed",
      message: "userId required!",
    });
  }

  try {
    const info = await ClearanceModel.findOne(
      { userId },
    );

    if (!info) {
      return res.status(404).json({
        Status: "Failed",
        message: "Clearance details not found!",
      });
    }

    res.status(200).json({
      Status: "Success",
      message: `Info fetched successfully!`,
      info,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const getAllClearances = async (req, res) => {
  try {
    let response = await ClearanceModel.aggregate([
      {
        $match: {},
      },
    ]);

    if (!response) {
      return res.status(404).json({
        Status: "Failed",
        message: "Clearance documents not found!",
      });
    }

    res.status(200).json({
      Status: "Success",
      message: `Clearance documents fetched successfully!`,
      response,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
