import { Patient, PublicPatient } from '../types';

import patients from '../../data/patients';

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

export default { getEntries, getNonSensitiveEntries };
