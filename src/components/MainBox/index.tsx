import React, { useEffect, useState } from "react";
import { DownOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-layout";
import ProLayout, { PageContainer, SettingDrawer } from "@ant-design/pro-layout";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Avatar, Button, Dropdown, Menu } from "antd";
import defaultProps from "./_defaultProps";
import logoPng from "../../assets/img/logo.png";
// import docsPng from '../../assets/img/docs.svg'

import "./index.less";
import UserService from "../../services/UserService";
import axios from "axios";
import util from "../../utils/util";
// import HelpButton from "../HelpButton";

const menuFooterRender = () => {
  return <div />;
};

const menu = (
  <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item icon={<DownOutlined />} disabled>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        </Menu.Item>
        <Menu.Item disabled>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
);

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const [pathname, setPathname] = useState("/coverage");
  const history = useNavigate();
  const rrLocation = useLocation();

  const [imageUrl, setImageUrl] = useState("/coverage");
  const [userInfo, setUserInfo] = useState<any>({});

  const RightContentRender = () => {
    return (
      <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <Avatar src={imageUrl} style={{marginRight:'8px'}} />
              {userInfo.nickname} <DownOutlined />
          </a>
      </Dropdown>
    );
  };

  useEffect(
    () => {
      UserService
        .getPersonalInfoThroughToken()
        .then((res) => {
          setUserInfo(res);
          axios
            .post(
              "http://public-api.rico.org.cn/file/list",
              { label: res.id, bucket: "qingkong-avatar" },
            )
            .then((res) => {
              setImageUrl(util.genUrl(res.data[0]));
            });
        });
    },
    [],
  );

  const menuItemRender = (item: any, dom: any) => {
    // console.log(item,1)
    return (
      <a
        onClick={() => {
          setPathname(item.path || '/coverage')
          history(item.path)
        }}
      >
        {dom}
      </a>
    );
  };

  function itemRender(route: any, params: any, routes: any, paths: any) {
    const last = routes.indexOf(route) === (routes.length - 1);
    return last ? (<span>{route.breadcrumbName}</span>) : (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
  }

  useEffect(
    () => {
      setPathname(rrLocation.pathname);
    },
    [rrLocation.pathname],
  );
  return (
    <div id="main-box">
      <ProLayout
        title="晴空管理平台"
        logo={logoPng}
        route={defaultProps.route}
        location={{
          pathname,
        }}
        breadcrumbProps={{
          itemRender,
        }}
        menuFooterRender={menuFooterRender}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={menuItemRender}
        rightContentRender={() => (
            <RightContentRender></RightContentRender>
        )}
        {...settings}
      >
        <PageContainer>
          <div>
            <Outlet />
              {/*<HelpButton></HelpButton>*/}
          </div>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting)
        }}
        disableUrlParams
      />
    </div>
  );
};
