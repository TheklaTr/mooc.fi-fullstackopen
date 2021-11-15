import { Diagnosis, Patient } from "../types";
import React, { createContext, useContext, useReducer } from "react";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patientDetails: Map<string, Patient>;
  diagnoses: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  patientDetails: new Map<string, Patient>(),
  diagnoses: {},
};

// https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript/54667477
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
