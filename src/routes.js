import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Overview from "./views/Overview";
import UserProfile from "./views/UserProfile";
import AddNewSession from "./views/AddNewSession";
import Errors from "./views/Errors";
import AllSessions from "./views/AllSessions";
import Compare from "./views/Compare";
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
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/add-new-session",
    layout: DefaultLayout,
    component: AddNewSession
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/all-sessions",
    layout: DefaultLayout,
    component: AllSessions
  },
  {
    path: "/compare",
    layout: DefaultLayout,
    component: Compare
  },
  {
    path: "/supplements",
    layout: DefaultLayout,
    component: Supplements
  }
];
