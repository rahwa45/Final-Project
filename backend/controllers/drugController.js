import Drug from "../models/drugModel.js";

// Get all drugs
export const getDrugs = async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.status(200).json(drugs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drugs" });
  }
};

// Get a single drug by ID
export const getDrugById = async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });
    res.status(200).json(drug);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drug" });
  }
};

// Add a new drug
export const addDrug = async (req, res) => {
  const { name, quantity, price } = req.body;

  try {
    const drug = await Drug.create({ name, quantity, price });
    res.status(201).json(drug);
  } catch (error) {
    res.status(500).json({ message: "Error adding drug" });
  }
};

// Update drug details
export const updateDrug = async (req, res) => {
  try {
    const updatedDrug = await Drug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDrug)
      return res.status(404).json({ message: "Drug not found" });
    res.status(200).json(updatedDrug);
  } catch (error) {
    res.status(500).json({ message: "Error updating drug" });
  }
};

// Delete a drug
export const deleteDrug = async (req, res) => {
  try {
    const drug = await Drug.findByIdAndDelete(req.params.id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });
    res.status(200).json({ message: "Drug deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting drug" });
  }
};
