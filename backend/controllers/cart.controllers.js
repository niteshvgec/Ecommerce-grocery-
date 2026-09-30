import User from "../models/usermodel.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const updateCart = async (req, res) => {
//   try {
//     const userId = req.user;
//     const { cartItem } = await User.findByIdAndUpdate(
//       userId,
//       {
//         cartItems,
//       },
//       { new: true },
//     );
//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ message: "user not found", success: false });
//     }
//     res.status(200).json({
//       updatedUser,
//       success: true,
//       message: "Cart updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
