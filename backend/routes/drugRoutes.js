import express from "express";
import {
  getDrugs,
  getDrugById,
  addDrug,
  updateDrug,
  deleteDrug,
} from "../controllers/drugController.js";

const router = express.Router();

router.get("/", getDrugs);
router.get("/:id", getDrugById);
router.post("/", addDrug);
router.put("/:id", updateDrug);
router.delete("/:id", deleteDrug);

export default router;
