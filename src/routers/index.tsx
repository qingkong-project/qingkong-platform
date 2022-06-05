import React from "react";
import MainBox from "../components/MainBox";
import { Navigate } from "react-router-dom";
import Translation from "../pages/Translation";
import CreateAndUpdate from "../pages/Translation/CreateAndUpdate";
import Note from "../pages/Note";
import NoteCreateAndUpdate from "../pages/Note/CreateAndUpdate";
import AccountCenter from "../pages/Account/AccountCenter/AccountCenter";
import AccountSettings from "../pages/Account/AccountSettings/AccountSettings";
import NoteDetail from "../pages/Note/NoteDetail/NoteDetail";

export default [
  {
    path: "/",
    element: <MainBox />,
    children: [
      { path: "/translation", element: <Translation /> },
      { path: "/translation/:id", element: <CreateAndUpdate /> },
      { path: "/note", element: <Note /> },
      { path: "/note/edit/:id", element: <NoteCreateAndUpdate /> },
      { path: "/note/detail/:id", element: <NoteDetail /> },
      { path: "/account/center", element: <AccountCenter /> },
      { path: "/account/settings", element: <AccountSettings /> },
    ],
  },
];
