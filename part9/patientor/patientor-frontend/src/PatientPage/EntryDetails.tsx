import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import { Header, Icon, Segment } from "semantic-ui-react";

import React from "react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalCheckDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry ${JSON.stringify(value)}`);
};

const HospitalCheckDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Segment style={{ margin: "20px auto", borderRadius: "10px", padding: "20px" }}>
      <Header as="h3">
        {entry.date} <Icon name="hospital" size="big" />
      </Header>
      <Header.Subheader style={{ color: "grey", fontStyle: "italic" }}>{entry.description}</Header.Subheader>
      <Header.Subheader>
        Discharge: {entry.discharge?.date} - {entry.discharge?.criteria}
      </Header.Subheader>
    </Segment>
  );
};

const OccupationalHealthcareDetails = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
  return (
    <Segment style={{ margin: "20px auto", borderRadius: "10px", padding: "20px" }}>
      <Header as="h4">
        {entry.date} <Icon name="stethoscope" size="huge" />
        {entry.employerName}
      </Header>
      <Header.Subheader style={{ color: "grey", fontStyle: "italic" }}>{entry.description}</Header.Subheader>
    </Segment>
  );
};

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const colorRating: SemanticCOLORS | undefined =
    entry.healthCheckRating === 0 ? "green" : entry.healthCheckRating === 1 ? "yellow" : entry.healthCheckRating === 2 ? "orange" : "red";

  return (
    <Segment style={{ margin: "20px auto", borderRadius: "10px", padding: "20px" }}>
      <Header as="h3">
        {entry.date} <Icon name="doctor" size="big" />
      </Header>
      <Header.Subheader style={{ color: "grey", fontStyle: "italic" }}>{entry.description}</Header.Subheader>
      <br />
      <Header.Subheader>
        <Icon name="heart" size="big" color={colorRating} />
      </Header.Subheader>
    </Segment>
  );
};

export default EntryDetails;
