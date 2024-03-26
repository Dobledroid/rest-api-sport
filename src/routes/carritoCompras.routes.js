import { Router } from "express";
import {
  addItemToCart,
  getItemsByUserID,
  deleteItemByID,
  updateItemQuantityByID,
} from "../controllers/carritoCompras.controller";

const router = Router();

router.post("/carrito-compras", addItemToCart);
router.get("/carrito-compras/:ID_usuario", getItemsByUserID);
router.delete("/carrito-compras/:ID_carrito", deleteItemByID);
router.put("/carrito-compras/:ID_carrito", updateItemQuantityByID);

export default router;
