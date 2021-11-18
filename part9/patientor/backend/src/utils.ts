/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  Entry,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewPatientEntry,
} from "./types";

import diagnosesEntries from "../data/diagnoses";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing value");
  }

  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries),
  };

  return newEntry;
};

const isEntry = (param: any): param is Entry => {
  return (
    typeof param === "object" &&
    Object.keys(param).includes("type") &&
    ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(
      param["type"]
    )
  );
};

const isEntries = (param: any): param is Entry[] => {
  return Array.isArray(param) && param.every((entry) => isEntry(entry));
};

const parseEntries = (entries: unknown) => {
  if (!entries || !isEntries(entries)) {
    throw new Error("Incorrect or missing entries: " + entries);
  }

  return entries;
};

const toEntries = (object: any): Array<Entry> => {
  const entryArray = object.entries as Array<any>;
  return parseEntries(entryArray);
};

const isDiagnosesCodesValid = (codes: Array<string>): boolean => {
  const validCodes = Object.values(diagnosesEntries.map((d) => d.code));
  return codes.every((code) => validCodes.includes(code));
};

const isNewBasicEntry = (object: any): boolean => {
  return (
    object.date &&
    isString(object.date) &&
    isDate(object.date) &&
    object.description &&
    isString(object.description) &&
    object.specialist &&
    isString(object.specialist) &&
    (!object.diagnosisCodes || isDiagnosesCodesValid(object.diagnosisCodes))
  );
};

const isNewHealthCheckEntry = (param: any): param is NewHealthCheckEntry => {
  const object = param as NewHealthCheckEntry;
  return (
    true &&
    typeof object === "object" &&
    Object.keys(object).includes("type") &&
    ["HealthCheck"].includes(object["type"]) &&
    Object.values(HealthCheckRating).includes(param.healthCheckRating)
  );
};

const isNewHospitalEntry = (param: any): param is NewHospitalEntry => {
  const object = param as NewHospitalEntry;
  return (
    true &&
    typeof object === "object" &&
    object.discharge !== undefined &&
    ["Hospital"].includes(object["type"]) &&
    isString(object.discharge.date) &&
    isDate(object.discharge.date) &&
    isString(object.discharge.criteria)
  );
};

const isNewOccupationalHealthcareEntry = (
  param: any
): param is NewOccupationalHealthcareEntry => {
  const object = param as NewOccupationalHealthcareEntry;
  return (
    true &&
    typeof object === "object" &&
    ["OccupationalHealthcare"].includes(object["type"]) &&
    isString(object.employerName) &&
    (!object.sickLeave ||
      (true &&
        isString(object.sickLeave.startDate) &&
        isDate(object.sickLeave.startDate) &&
        isString(object.sickLeave.startDate) &&
        isDate(object.sickLeave.startDate)))
  );
};

const isNewEntry = (object: any): object is NewEntry => {
  return (
    isNewBasicEntry(object) &&
    (isNewHealthCheckEntry(object) ||
      isNewHospitalEntry(object) ||
      isNewOccupationalHealthcareEntry(object))
  );
};

const parseNewEntry = (newEntry: any): NewEntry => {
  if (!isNewEntry(newEntry)) {
    throw new Error("Invalid new entry" + newEntry);
  }

  return newEntry;
};

const toNewEntry = (newEntry: any): NewEntry => {
  return parseNewEntry(newEntry);
};

export { toNewPatientEntry, toNewEntry, toEntries };
