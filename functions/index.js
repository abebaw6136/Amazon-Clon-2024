const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY); // Ensure STRIPE_KEY is set in your .env file

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success"
  });
});

app.post("/charge", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      logger.error("Error creating payment intent:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } else {
    res.status(403).json({
      message: "Total must be greater than 0",
    });
  }
});

// Export the Express app as a Cloud Function
exports.api = onRequest(app);