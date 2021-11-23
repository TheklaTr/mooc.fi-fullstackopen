import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import { Field, Form, Formik } from "formik";

import { NewHospitalEntry } from "../types";
import React from "react";
import { useStateValue } from "../state";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewHospitalEntry) => void;
}

const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.discharge && !values.discharge.criteria) {
          errors["discharge.criteria"] = requiredError;
        }
        if (values.discharge && !values.discharge.date) {
          errors["discharge.date"] = requiredError;
        }
        return errors;
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
            <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
            <Field label="Description" placeholder="Description" name="description" component={TextField} />
            <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={Object.values(diagnoses)} />
            <Field label="Discharge date" placeholder="YYYY-MM-DD" name="discharge.date" component={NumberField} />
            <Field label="Discharge criteria" placeholder="Criteria" name="discharge.criteria" component={TextField} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
