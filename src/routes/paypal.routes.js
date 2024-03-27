import { Router } from "express";
import {
  createOrder,
  captureOrder,
  cancelPayment,
} from "../controllers/paypal.controller.js";

const router = Router();

router.post("/paypal/create-order", createOrder);

router.get("/paypal/capture-order", captureOrder);

router.get("/paypal/cancel-order", cancelPayment);

export default router;
