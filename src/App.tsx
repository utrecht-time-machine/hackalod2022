import React from "react";
import "./App.css";
import Layout from "./components/layout/layout";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import DomRenderer from "./components/dom-renderer/dom-renderer";
import { StateModel } from "./models/state-model";

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

export const state: StateModel = {
  institutions: [],
  materials: [],
  yearRange: [],
  techniques: [],
};
export const StateContext = React.createContext(state);

function App() {
  return (
    <StateContext.Provider value={state}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </StateContext.Provider>
  );
}

export default App;
