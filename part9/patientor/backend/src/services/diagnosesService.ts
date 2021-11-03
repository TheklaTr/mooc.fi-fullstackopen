import { Diagnose } from './../types';
import diagnosesEntries from '../../data/diagnoses';

const getEntries = (): Diagnose[] => {
  return diagnosesEntries;
};

export default { getEntries };
