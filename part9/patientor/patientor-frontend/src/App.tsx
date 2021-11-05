import { Button, Container, Divider, Header } from 'semantic-ui-react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Patient } from './types';
import PatientListPage from './PatientListPage';
import PatientPage from './PatientPage/index';
import React from 'react';
import { apiBaseUrl } from './constants';
import axios from 'axios';
import { useStateValue } from './state';

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: 'SET_PATIENT_LIST', payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
