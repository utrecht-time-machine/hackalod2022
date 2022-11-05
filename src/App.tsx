import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/layout/layout";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import DomRenderer, { DomTower } from "./components/dom-renderer/dom-renderer";
import {
  createStore,
  StateMachineProvider,
  useStateMachine,
} from "little-state-machine";
import { StateModel } from "./models/state.model";
import { testSet } from "./data/testSet";
import { FilterService } from "./services/filter-service";
import { updateYearRange } from "./actions/actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/dom",
    element: <DomRenderer />,
  },
]);

createStore({
  materials: [],
  institutions: [],
  techniques: [],
  yearRange: [],
});

function App() {
  return (
    <StateMachineProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </StateMachineProvider>
  );
}

export default App;
