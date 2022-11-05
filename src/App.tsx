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
  makers: [],
  institutions: [],
  techniques: [],
  yearRange: [],
  selectedImage: null,
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
