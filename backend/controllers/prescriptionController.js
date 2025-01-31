import Prescription from "../models/prescriptionModel.js";

// Add a new prescription
export const addPrescription = async (req, res) => {
  const { patientName, drugDetails } = req.body;

  try {
    const prescription = await Prescription.create({
      patientName,
      drugDetails,
    });
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Error creating prescription" });
  }
};

// Get all prescriptions
export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate(
      "drugDetails.drugId"
    );
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
};

// Get a single prescription by ID
export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate(
      "drugDetails.drugId"
    );
    if (!prescription)
      return res.status(404).json({ message: "Prescription not found" });
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescription" });
  }
};

// Update prescription status
export const updatePrescriptionStatus = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedPrescription)
      return res.status(404).json({ message: "Prescription not found" });
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(500).json({ message: "Error updating prescription status" });
  }
};
