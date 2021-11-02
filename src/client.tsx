import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Interpret, spawn } from "./browser/machines/user";
import App from "./browser/App";
import Test from "./browser/Test";

const current_user = {
  name: "peter",
};

// const machine = spawn({});
// const { service, data } = Interpret(machine);
console.log("HYDRATE");
hydrate(
  <BrowserRouter>
    <App current_user={current_user} />
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
