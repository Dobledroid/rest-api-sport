import { Router } from "express";
import {
  getMembresiaUsuarioByUserId,
  addNewMembresiaUsuario,
  deleteMembresiaUsuarioById,
  updateMembresiaUsuarioById,
} from "../controllers/membresiasUsuarios.controller";

const router = Router();

router.get("/membresia-usuario/:id", getMembresiaUsuarioByUserId);
router.post("/membresia-usuario", addNewMembresiaUsuario);
router.delete("/membresia-usuario/:id", deleteMembresiaUsuarioById);
router.put("/membresia-usuario/:id", updateMembresiaUsuarioById);

export default router;
