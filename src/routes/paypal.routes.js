import { Router } from "express";
import {
  createOrder,
  createOrderMembresia,
  captureOrder,
  captureOrderMembresia,
  cancelPayment,
} from "../controllers/paypal.controller.js";

const router = Router();

router.post("/paypal/create-order", createOrder);

router.post("/paypal/create-order-membresia", createOrderMembresia);

router.get("/capture-order", captureOrder);

router.get("/capture-order-membresia", captureOrderMembresia);

router.get("/cancel-order", cancelPayment);

export default router;
