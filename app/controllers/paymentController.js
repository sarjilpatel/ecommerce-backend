const stripe = require("stripe")(
  "sk_test_51OgiXySF7soF3JJNGxVTo2KG7bErELfjBlN3cWnWrqj8JwgsHOLLymn9vtooYBCUufEg3fgw941He2kE4B0wksmW00y45ZvNux"
);

exports.createPaymentIntent = async (req, res, next) => {
  try {
    // Create a PaymentIntent with the order amount and currency
    console.log(req.body, "*****************amount");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "INR",
      //   payment_method_types: ["card"],
      description: "Placing order on website",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error making payment:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
