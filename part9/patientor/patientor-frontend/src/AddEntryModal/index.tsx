import { Modal, Segment } from "semantic-ui-react";

import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { EntryFormValues } from "../PatientPage";
import React from "react";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryValue: string | undefined;
  setEntryValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <label>Type</label>
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
