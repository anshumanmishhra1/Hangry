import express from "express"
import { paymentRazorpay,verifyRazorpay } from "../controllers/razorpayController.js";

const razorpayRouter = express.Router();

razorpayRouter.post('/pay-razor', paymentRazorpay);
razorpayRouter.post('/verify-razor', verifyRazorpay);


export default razorpayRouter;