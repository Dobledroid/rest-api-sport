import { Router } from "express";
import {
  addNewOrdenPedido,
  getOrdenPedidoByUserID,
  getOrdenPedidoByID,
  updateOrdenPedidoByID,
  deleteOrdenPedidoByID
} from "../controllers/ordenesPedidos.controller";

const router = Router();

router.post("/orden-pedido", addNewOrdenPedido);
router.get("/orden-pedido/usuario/:ID_usuario", getOrdenPedidoByUserID);
router.get("/orden-pedido/:ID_pedido", getOrdenPedidoByID);
router.put("/orden-pedido/:ID_pedido", updateOrdenPedidoByID);
router.delete("/orden-pedido/:ID_pedido", deleteOrdenPedidoByID);

export default router;
