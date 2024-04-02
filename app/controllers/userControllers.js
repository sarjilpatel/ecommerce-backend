// const User = require("../models/userModel");
const db = require("../models");
const sendToken = require("../utils/jwtToken");

const User = db.User;
const Cart = db.Cart;
const CartItem = db.CartItem;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const ShippingType = db.ShippingType;
const Address = db.Address;
const ProductItem = db.ProductItem;

exports.signupUser = async (req, res, next) => {
  try {
    // console.log(req.files);
    console.log(req.file);
    const { vName, vEmail, vPassword } = req.body;

    const user = await User.findOne({ where: { vEmail } });

    if (user) {
      return res.status(400).json({
        status: 400,
        message: "Email Already exist",
      });
    }

    console.log(req.file);

    const vImage = req.file ? req.file.filename : "";

    const newUser = await User.create({
      vName,
      vEmail,
      vPassword,
      vImage: "/uploads/userImages/" + vImage,
    });

    sendToken(newUser, 201, res);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { vEmail, vPassword } = req.body;

    // checking if user has given password and email both

    if (!vEmail || !vPassword) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email or password is wrong",
      });
    }

    const user = await User.findOne({
      where: { vEmail },
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email or password is wrong",
      });
    }

    const isPasswordMatched = vPassword === user.vPassword;

    if (!isPasswordMatched) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email or password is wrong",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Logged Out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },

      include: [
        {
          model: Cart,
          include: [
            {
              model: CartItem,
              include: [
                {
                  model: ProductItem,
                },
              ],
            },
            {
              model: ShippingType,
            },
          ],
        },
        {
          model: Order,
          include: [
            {
              model: OrderItem,
              include: [
                {
                  model: ProductItem,
                },
              ],
            },
            {
              model: ShippingType,
            },
          ],
        },
        {
          model: Address,
        },
      ],
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error getting profile", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userRepo = myDataSource.getRepository(User);
    const user = userRepo.update({ id: req.user.id }, req.body);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
