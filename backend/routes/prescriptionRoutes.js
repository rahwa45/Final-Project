import express from "express";
import {
  addPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescriptionStatus,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", addPrescription);
router.get("/", getPrescriptions);
router.get("/:id", getPrescriptionById);
router.put("/:id", updatePrescriptionStatus);

export default router;
