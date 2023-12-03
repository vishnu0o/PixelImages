const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/", async (req, res) => {
  try {
    const { amount } = req.body;

    const customer = await stripe.customers.create({
      metadata: {
        amount: amount,
      },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Your Product Name",
              metadata: {
                id: "Your Product ID",
              },
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}image`,
    //   cancel_url: `${process.env.CLIENT_URL}/paymentFail`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

module.exports = router;
