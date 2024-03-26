import { Router } from "express";
import {
  addNewMembershipType,
  getMembershipTypeById,
  getAllMembershipTypes,
  deleteMembershipTypeById,
  updateMembershipTypeById,
  getMembresillaIdUnico
} from "../controllers/tiposMembresias.controller";

const router = Router();

router.get("/membershipTypes", getAllMembershipTypes);
router.get("/membresillasIdUnico/:ID_UnicoMembresilla", getMembresillaIdUnico);
router.post("/membershipTypes", addNewMembershipType);
router.get("/membershipTypes/:id", getMembershipTypeById);
router.delete("/membershipTypes/:id", deleteMembershipTypeById);
router.put("/membershipTypes/:id", updateMembershipTypeById);

export default router;
