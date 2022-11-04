import React from "react";
import "./App.css";
import Layout from "./components/layout/layout";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import DomRenderer from "./components/dom-renderer/dom-renderer";

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

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
