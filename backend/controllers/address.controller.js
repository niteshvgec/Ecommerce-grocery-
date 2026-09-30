import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;

    await Address.create({
      ...address,
      userId,
    });
    res.status(201).json({
      message: "Address added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error addinng address :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user;
    // console.log(userId);
    const addresses = await Address.find({ userId });
    // console.log(addresses);
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
