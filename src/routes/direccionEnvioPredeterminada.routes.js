import { Router } from "express";
import {
  setDireccionPredeterminada,
  getDireccionPredeterminadaByUserID,
  deleteDireccionPredeterminadaByUserID
} from "../controllers/direccionEnvioPredeterminada.controller";

const router = Router();

router.post("/direccion-envio-predeterminada", setDireccionPredeterminada);
router.get("/direccion-envio-predeterminada-user/:ID_usuario", getDireccionPredeterminadaByUserID);
router.delete("/direccion-envio-predeterminada-user/:ID_usuario", deleteDireccionPredeterminadaByUserID);

export default router;
