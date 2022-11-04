import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/layout/layout";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import DomRenderer from "./components/dom-renderer/dom-renderer";
import { createStore, StateMachineProvider } from "little-state-machine";
import { StateModel } from "./models/state.model";

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

const state: StateModel = {
  institutions: [],
  materials: [],
  yearRange: [],
  techniques: [],
};

createStore({
  materials: [],
  institutions: [],
  techniques: [],
  yearRange: [],
});

function App() {
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <StateMachineProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </StateMachineProvider>
  );
}

export default App;
