import React, { useState } from "react";
import Filters from "../filters/filters";

const Layout = (props: {}) => {
  return (
    <div className={"grid grid-cols-6 h-screen"}>
      <div className={"col-span-4 bg-black p-4"}>
        <Filters></Filters>
      </div>
      <div className={"col-span-2 bg-slate-600 p-4"}>
        <p>Column</p>
        <img src="https://placekitten.com/400/300" alt="Placeholder" />
      </div>
    </div>
  );
};

export default Layout;
