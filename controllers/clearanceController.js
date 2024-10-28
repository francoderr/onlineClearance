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

  let obj = { [req.body.value]: pic };

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
  const userId = req.user._id;
  const val = req.body.value;
  const action = req.body.action;

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

//   let userId = req.user._id;
//   userId = userId.toString();

//   if (!userId) {
//     return res.status(400).send("userId required to get cart items");
//   }

//   try {
//     await CartModel.aggregate([
//       {
//         $match: {
//           userId,
//         },
//       },
//       {
//         $addFields: {
//           productIdId: { $toObjectId: "$productId" },
//         },
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "productIdId",
//           foreignField: "_id",
//           as: "productDetails",
//         },
//       },
//       {
//         $unwind: "$productDetails",
//       },
//       {
//         $project: {
//           id: "$_id",
//           _id: 0,
//           username: 1,
//           userId: 1,
//           productId: 1,
//           title: "$productDetails.title",
//           image: "$productDetails.image",
//           description: "$productDetails.description",
//           price: "$productDetails.price",
//         },
//       },
//     ]).then((response) => {
//       if (response) {
//         res.status(200).json({
//           Status: "Success",
//           message: "fetched cart items successfuly!",
//           data: response,
//         });
//       } else {
//         res.status(500).json({
//           Status: "FAILED",
//           message: "Could not fetch cart items",
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       Status: "Failed",
//       message: "An error occurred while fetching cart items",
//       error: error.message,
//     });
//   }
// };