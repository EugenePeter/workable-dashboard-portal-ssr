import React from "react";

import { asyncComponent } from "@jaredpalmer/after";

import Test from "./browser/Test";

const routes = [
  {
    path: "/",
    exact: true,
    component: Test,
  },
];

export default routes;
