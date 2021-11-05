import { updatePatient, useStateValue } from "../state";

import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import React from "react";
import { apiBaseUrl } from "./../constants";
import axios from "axios";
import { useParams } from "react-router";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

  React.useEffect(() => {
    if (patients) {
      const patientInState = patients[id];
      // check if it already is in the app state
      if ("ssn" in patientInState) {
        setPatient(patientInState);
      } else {
        const fetchPatient = async () => {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          setPatient(patientFromApi);
          dispatch(updatePatient(patientFromApi));
        };

        void fetchPatient();
      }
    }
  }, [id, patients, dispatch]);

  if (!patient) {
    return <p>Fetching...</p>;
  }

  return (
    <div>
      <h1>
        {patient.name} {GenderToIcon(patient)}
      </h1>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
    </div>
  );
};

const GenderToIcon = (patient: Patient) => {
  switch (patient.gender) {
    case "male":
      return <Icon name="mars" />;
    case "female":
      return <Icon name="venus" />;
    default:
      return <Icon name="non binary transgender" />;
  }
};

export default PatientPage;
