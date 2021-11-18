import {
  Entry,
  NewEntry,
  NewPatientEntry,
  Patient,
  PublicPatient,
} from "../types";

import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PublicPatient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const findPatientById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  if (!entry) {
    throw new Error(`Invalid ID: ${id}`);
  }

  return entry;
};

const addEntry = (id: string, entry: NewEntry): Patient => {
  const foundPatient = patients.find((p) => p.id === id);
  if (!foundPatient) {
    throw new Error(`Invalid patient id: ${id}`);
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  foundPatient.entries = [...foundPatient.entries, newEntry];

  return foundPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findPatientById,
  addPatient,
  addEntry,
};
