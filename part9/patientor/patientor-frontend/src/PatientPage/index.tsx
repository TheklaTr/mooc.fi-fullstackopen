import { Container, Header, Icon } from "semantic-ui-react";
import { Diagnosis, Patient } from "../types";
import { setDiagnosisList, updatePatient, useStateValue } from "../state";

import EntryDetails from "./EntryDetails";
import React from "react";
import { apiBaseUrl } from "./../constants";
import axios from "axios";
import { useParams } from "react-router";

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

  React.useEffect(() => {
    if (patients) {
      const patientInState = patients[id];
      // check if it already is in the app state
      if (patientInState && "ssn" in patientInState) {
        setPatient(patientInState);
      } else {
        const fetchPatient = async () => {
          const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          setPatient(patientFromApi);
          dispatch(updatePatient(patientFromApi));
        };

        void fetchPatient();
      }

      const fetchDiagnosesList = async () => {
        try {
          const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
          dispatch(setDiagnosisList(diagnosesListFromApi));
        } catch (error) {
          console.log(error);
        }
      };

      if (!diagnoses) {
        void fetchDiagnosesList();
      }
    }
  }, [id, patients, dispatch]);

  if (!patient) {
    return <p>Fetching...</p>;
  }

  return (
    <Container>
      <Header as="h2">
        {patient.name} {GenderToIcon(patient)}
      </Header>
      <Header.Subheader>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </Header.Subheader>
      <br />

      {patient?.entries.length !== 0 ? (
        <Container>
          <Header>entries</Header>
          {patient?.entries.map((e) => {
            return (
              <Container key={e.id}>
                <EntryDetails entry={e} />
              </Container>
            );
          })}
        </Container>
      ) : null}
    </Container>
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
