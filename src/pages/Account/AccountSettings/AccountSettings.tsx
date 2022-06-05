import React, { useRef, useState } from "react";
import { Avatar, Button, Input, List, message, Tabs } from "antd";
import ProCard from "@ant-design/pro-card";
import "./index.less";
import { SecurityTab } from "./components/Security";
import { PageContainer } from "@ant-design/pro-layout";
// import {copyToClipboard} from "../../utils/util";
import ChangePassword from "./components/ChangePassword";
import ProForm, {
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import BasicSettings from "./BasicSettings";
import SecuritySettings from "./SecuritySettings";
const { TabPane } = Tabs;

export default function Admin() {
  const [tabActiveKey, setTabActiveKey] = useState("基本设置");

  return (
    <div style={{backgroundColor:'white',padding:'16px 0'}}>
            <Tabs activeKey={tabActiveKey} tabPosition={'left'} onChange={(key)=>{
                setTabActiveKey(key)
            }}>



                <TabPane tab="基本设置" key="基本设置">
                    <BasicSettings></BasicSettings>
                </TabPane>


                <TabPane tab="安全设置" key="安全设置">
                    <SecuritySettings></SecuritySettings>
                </TabPane>





            </Tabs>
        </div>
  );
}
