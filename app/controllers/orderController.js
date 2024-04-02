const { default: puppeteer } = require("puppeteer");
const db = require("../models");
const { cartCalculator } = require("./cartController");
const OrderHtmlTemplate = require("../templates/orderInvoiceTemplate");
const moment = require("moment");

const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const ShippingType = db.ShippingType;
const Cart = db.Cart;
const CartItem = db.CartItem;
const User = db.User;
const Address = db.Address;

exports.createOrder = async (req, res, next) => {
  try {
    let {
      iShippingAddress,
      iBillingAddress,
      vPaymentId,
      vPaymentStatus,
      cart,
    } = req.body;
    let {
      fTotal,
      fDiscount,
      vCouponcode,
      iShippingTypeId,
      fDiscounted,
      fGrandTotal,
      fTotalTax,
    } = cart;

    let newOrder = await Order.create({
      fTotal,
      fDiscount,
      vCouponCode: vCouponcode,
      iShippingAddress,
      iBillingAddress,
      vPaymentId,
      vPaymentStatus,
      iShippingTypeId,
      fDiscounted,
      fGrandTotal,
      fTotalTax,
      iUserId: req.user.id,
    });

    await cart.CartItems.forEach(async (ci) => {
      await OrderItem.create({
        iOrderId: newOrder.id,
        iProductId: ci.iProductId,
        iQuantity: ci.iQuantity,
      });
    });

    newOrder = await Order.findOne({
      where: {
        id: newOrder.id,
      },
      include: [
        {
          model: OrderItem,
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

    await cart.CartItems.forEach(async (ci) => {
      await CartItem.destroy({
        where: {
          id: ci.id,
        },
      });
    });

    cart = await cartCalculator(req.user.id);
    const orders = await Order.findAll({
      where: {
        iUserId: req.user.id,
      },
      include: [
        {
          model: OrderItem,
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

    await res.status(201).json({
      status: 201,
      success: true,
      message: "Order created Successfully!",
      order: newOrder,
      cart,
      orders,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        iUserId: req.user.id,
      },
      include: [
        {
          model: OrderItem,
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

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        iUserId: req.user.id,
      },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: ShippingType,
        },
        { model: db.Address, as: "shippingAddress" },
        { model: db.Address, as: "billingAddress" },
      ],
    });

    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order Not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.generateInvoice = async (req, res, next) => {
  console.log(req.params.id, req.user.id);
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        iUserId: req.user.id,
      },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: ShippingType,
        },
        { model: db.Address, as: "shippingAddress" },
        { model: db.Address, as: "billingAddress" },
      ],
    });

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(OrderHtmlTemplate(order));

    // Downlaod the PDF
    const pdf = await page.pdf({
      margin: { top: "30px", right: "10px", bottom: "30px", left: "10px" },
      printBackground: true,
      format: "A4",
    });

    // Close the browser instance
    await browser.close();

    res.setHeader("Content-Disposition", 'attachment; filename="invoice.pdf"');
    res.setHeader("Content-Type", "application/pdf");

    // Send the PDF buffer as response
    res.send(pdf);
  } catch (error) {
    console.error("Error generating order invoice:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
