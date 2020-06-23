import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Account from "./views/Account";
import Analyze from "./views/Analyze";
import Login from "./views/Login";
import Overview from "./views/Overview";
import Record from "./views/Record";
import Register from "./views/Register";
import Sessions from "./views/Sessions";
import Settings from "./views/Settings";
import Supplements from "./views/Supplements";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/overview" />
  },
  {
    path: "/overview",
    layout: DefaultLayout,
    component: Overview
  },
  {
    path: "/analyze",
    layout: DefaultLayout,
    component: Analyze
  },
  {
    path: "/record",
    layout: DefaultLayout,
    component: Record
  },
  {
    path: "/sessions",
    layout: DefaultLayout,
    component: Sessions
  },
  {
    path: "/supplements",
    layout: DefaultLayout,
    component: Supplements
  },
  {
    path: "/account",
    layout: DefaultLayout,
    component: Account
  },
  {
    path: "/register",
    layout: DefaultLayout,
    component: Register
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login
  },
  {
    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
];
