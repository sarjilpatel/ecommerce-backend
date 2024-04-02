// const User = require("../models/userModel");
const db = require("../models");

const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;
const ShippingType = db.ShippingType;

const cartCalculator = async (id) => {
  let cart = await Cart.findOne({
    where: { iUserId: id },
    include: [
      {
        model: CartItem,
        include: [
          {
            model: Product,
          },
        ],
      },
      {
        model: ShippingType,
      },
    ],
  });

  console.log(cart.discount, "cart discount");

  let total = 0;
  let taxapplied = 0;
  let discountedPrice = 0;
  let grandTotal = 0;

  cart.CartItems.map((ci) => {
    console.log(ci.Product);
    total +=
      ci.iQuantity *
      (ci.Product.fPrice + (ci.Product.fPrice * ci.Product.fTax) / 100);
    taxapplied += (ci.iQuantity * ci.Product.fPrice * ci.Product.fTax) / 100;
  });

  console.log(total, taxapplied, "cart total,tax");

  discountedPrice = ((100 - cart.fDiscount) * total) / 100;

  console.log(discountedPrice, "cart discounted price after discount");

  grandTotal = discountedPrice + cart.ShippingType.fCharge;

  console.log(grandTotal, "cart Grand total after shipping");

  await Cart.update(
    {
      fTotal: total,
      fDiscounted: discountedPrice,
      fTotalTax: taxapplied,
      fGrandTotal: grandTotal,
    },
    {
      where: {
        id: cart.id,
      },
    }
  );

  cart = await await Cart.findOne({
    where: { iUserId: id },
    include: [
      {
        model: CartItem,
        include: [
          {
            model: Product,
          },
        ],
      },
      {
        model: ShippingType,
      },
    ],
  });

  return cart;
};

const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {
        iUserId: req.user.id,
      },
    });

    if (!cart) {
      cart = await Cart.create({
        iUserId: req.user.id,
        iShippingTypeId: 1,
      });
    }

    cart = await Cart.findOne({
      where: { iUserId: req.user.id },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: ShippingType,
        },
      ],
    });

    res.status(201).json({
      status: 201,
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const addProductToCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {
        iUserId: req.user.id,
      },
      raw: true,
    });

    if (!cart) {
      cart = await Cart.create({
        iUserId: req.user.id,
        iShippingTypeId: 1,
      });
    }

    // console.log(cart.id, "&&&&&&&&");

    //creating cartitem if not wexist
    let cartItem = await CartItem.findOne({
      where: {
        iCartId: cart.id,
        iProductId: req.body.iProductId,
      },
    });

    if (!cartItem) {
      cartItem = await CartItem.create(
        {
          iCartId: cart.id,
          iProductId: req.body.iProductId,
          iQuantity: req.body.iQuantity,
        },
        { raw: true }
      );
      console.log(
        cartItem
        // "*************************** Cartitem ********** created"
      );
    } else {
      console.log(
        cartItem
        // "*************************** Cartitem before update"
      );
      await CartItem.update(
        {
          iQuantity: cartItem.iQuantity + req.body.iQuantity,
        },
        {
          where: {
            id: cartItem.id,
          },
        }
      );
    }

    cart = await cartCalculator(req.user.id);

    // console.log(cart.CartItems, "**********************************");

    res.status(201).json({
      status: 201,
      success: true,
      message: "Product added successfully",
      cart,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const removeProductFromCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {
        iUserId: req.user.id,
      },
      raw: true,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Cart not found",
      });
    }

    // console.log(cart.id, "&&&&&&&&");

    //creating cartitem if not wexist
    let cartItem = await CartItem.findOne({
      where: {
        iCartId: cart.id,
        iProductId: req.params.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "CartItem not found",
      });
    }

    CartItem.destroy({
      where: {
        id: cartItem.id,
      },
    });

    cart = await cartCalculator(req.user.id);

    res.status(200).json({
      success: false,
      status: 200,
      message: "CartItem deleted",
      cart,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const setCartProductQuantity = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {
        iUserId: req.user.id,
      },
      raw: true,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Cart not found",
      });
    }

    // console.log(cart.id, "&&&&&&&&");

    //creating cartitem if not wexist
    let cartItem = await CartItem.findOne({
      where: {
        iCartId: cart.id,
        iProductId: req.body.iProductId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "CartItem not found",
      });
    }

    await CartItem.update(
      { iQuantity: req.body.iQuantity },
      {
        where: {
          id: cartItem.id,
        },
      }
    );

    cart = await cartCalculator(req.user.id);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quantity set successfully!",
      cart,
    });
  } catch (error) {
    console.error("Error setting quantity of product of cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const discountCodes = [
  {
    code: "DIS40",
    discount: 40,
  },
  {
    code: "DIS10",
    discount: 10,
  },
  {
    code: "SAR05",
    discount: 5,
  },
  {
    code: "DIS20",
    discount: 20,
  },
  {
    code: "MYDIS17",
    discount: 17,
  },
  {
    code: "YOUDIS60",
    discount: 60,
  },
  {
    code: "NEWUSER50",
    discount: 50,
  },
];

const addDiscountCode = async (req, res, next) => {
  try {
    const discountCode = req.body.discountCode;

    const code = discountCodes.find((c) => c.code === discountCode);

    if (code) {
      await Cart.update(
        {
          fDiscount: code.discount,
          vCouponcode: code.code,
        },
        {
          where: {
            iUserId: req.user.id,
          },
        }
      );

      const cart = await cartCalculator(req.user.id);

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Coupon code Applied",
        cart,
      });
    } else {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Coupon code not found",
      });
    }
  } catch (error) {
    console.error("Error adding discount to cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const removeDiscountCode = async (req, res, next) => {
  try {
    await Cart.update(
      {
        fDiscount: 0,
        vCouponcode: "",
      },
      {
        where: {
          iUserId: req.user.id,
        },
      }
    );
    const cart = await cartCalculator(req.user.id);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Discount removed",
      cart,
    });
  } catch (error) {
    console.error("Error adding discount to cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const changeShipping = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {
        iUserId: req.user.id,
      },
      raw: true,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Cart Not found",
      });
    }

    const newShipping = await ShippingType.findOne({
      where: { id: req.body.iShippingid },
    });

    if (!newShipping) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "new shipping Not found",
      });
    }

    await Cart.update(
      { iShippingTypeId: newShipping.id },
      { where: { iUserId: req.user.id } }
    );

    cart = await cartCalculator(req.user.id);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "shipping updated",
      cart,
    });
  } catch (error) {
    console.error("Error updating shipping cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getCart,
  addProductToCart,
  removeProductFromCart,
  setCartProductQuantity,
  addDiscountCode,
  removeDiscountCode,
  changeShipping,
  cartCalculator,
};
