import { Router } from "express";
import {
  getMembresiaUsuarioByUserId,
  addNewMembresiaUsuario,
  deleteMembresiaUsuarioById,
  updateMembresiaUsuarioById,
  getMembresiaUsuarioByIDUnicoMembresia,
  existeUnaMembresiaUsuarioByID
} from "../controllers/membresiasUsuarios.controller";

const router = Router();

router.get("/membresia-usuario/:id", getMembresiaUsuarioByUserId);
router.get("/membresia-usuario-ID-unico-membresia/:ID_UnicoMembresia", getMembresiaUsuarioByIDUnicoMembresia);
router.get("/membresia-usuario-existe/:id", existeUnaMembresiaUsuarioByID);
router.post("/membresia-usuario", addNewMembresiaUsuario);
router.delete("/membresia-usuario/:id", deleteMembresiaUsuarioById);
router.put("/membresia-usuario/:id", updateMembresiaUsuarioById);

export default router;
