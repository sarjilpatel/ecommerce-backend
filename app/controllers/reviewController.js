const db = require("../models/index");

const Review = db.Review;
const User = db.User;
const Product = db.Product;
exports.addReview = async (req, res, next) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      iUserId: req.user.id,
    });

    const allReviews = await Review.findAll({
      where: {
        iProductId: req.body.iProductId,
      },
    });

    let rating = 0;
    allReviews.forEach((r) => {
      rating += r.fRating;
    });

    rating /= allReviews.length;

    await Product.update(
      { fRatings: rating },
      { where: { id: req.body.iProductId } }
    );

    const review = await Review.findOne({
      where: {
        id: newReview.id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Review Created",
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getProductsReviews = async (req, res, next) => {
  try {
    // console.log(req.params, "**********************");
    const reviews = await Review.findAll({
      where: {
        ProductId: req.params.pid,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "All Reviews",
      reviews,
    });
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
