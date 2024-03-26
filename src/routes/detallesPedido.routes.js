import { Router } from "express";
import {
  getDetallesPedidoByPedidoID,
  addNewDetallePedido,
  deleteDetallePedidoByID,
  updateDetallePedidoByID,
} from "../controllers/detallesPedido.controller";

const router = Router();

router.get("/detalles-pedido/:id", getDetallesPedidoByPedidoID);
router.post("/detalles-pedido", addNewDetallePedido);
router.delete("/detalles-pedido/:id", deleteDetallePedidoByID);
router.put("/detalles-pedido/:id", updateDetallePedidoByID);

export default router;
