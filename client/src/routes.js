import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Overview from "./views/Overview";
import Analyze from "./views/Analyze";
import Record from "./views/Record";
import Settings from "./views/Settings";
import Sessions from "./views/Sessions";
import Account from "./views/Account";
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
    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
];
