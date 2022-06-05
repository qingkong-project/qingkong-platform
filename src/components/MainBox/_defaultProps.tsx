import { CrownOutlined, TableOutlined } from "@ant-design/icons";
import React from "react";

export default {
  route: {
    path: "/",
    routes: [
      { path: "/translation", name: "多语言翻译", icon: <TableOutlined /> },
      { path: "/translation/:id", name: "详情", hideInMenu: true },
      { path: "/note", name: "笔记", icon: <TableOutlined /> },
      { path: "/note/edit/:id", name: "note编辑", hideInMenu: true },
      { path: "/note/detail/:id", name: "note详情", hideInMenu: true },
      {
        path: "/account",
        name: "个人页",
        routes: [
          {
            path: "/account/center",
            name: "个人中心",
            icon: <CrownOutlined />,
            component: "./Welcome",
          },
          {
            path: "/account/settings",
            name: "个人设置",
            icon: <CrownOutlined />,
            component: "./Welcome",
          },
        ],
      },
    ],
  },
  location: { pathname: "/#/" },
};
