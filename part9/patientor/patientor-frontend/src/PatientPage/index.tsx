import { Button, Container, Header, Icon } from "semantic-ui-react";
import { Diagnosis, Entry, Patient } from "../types";
import { setDiagnosisList, updatePatient, useStateValue } from "../state";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from "./EntryDetails";
import React from "react";
import { apiBaseUrl } from "./../constants";
import axios from "axios";
import { useParams } from "react-router";

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, "id">;

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

  // Entry modal states and control methods
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const [entryValue, setEntryValue] = React.useState<string | undefined>(undefined);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || "Unknown error");
    }
  };

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

      <Button onClick={() => openModal()}>Add New Entry</Button>

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

      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        entryValue={entryValue}
        setEntryValue={setEntryValue}
      />
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
