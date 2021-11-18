import { toNewEntry, toNewPatientEntry } from "../utils";

import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  patient ? res.send(patient) : res.sendStatus(404);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(id, newEntry);
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

export default router;
