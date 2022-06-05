import { List } from "antd";
import ChangePassword from "./components/ChangePassword";
import React, { useState } from "react";
import { SecurityTab } from "./components/Security";

const SecuritySettings = () => {
  const [currentTab, setTab] = useState("Security");

  // 生成当前页组件
  const generateContent = () => {
    switch (currentTab) {
      case "Security":
        return <SecurityTab />;
      case "123":
        return <div>123</div>;
    }
  };
  const data = ["Racing car sprays burning fuel into crowd."];
  return (
    <div>
          <List
              size="large"
              header={<h3>安全设置</h3>}
              dataSource={data}
              renderItem={item => (
                  <div>
                      <List.Item actions={[<ChangePassword></ChangePassword>]}>
                          <List.Item.Meta
                              title={<span>账号密码</span>}
                              description="在这里可以修改您的密码"
                          />
                      </List.Item>
                      <List.Item actions={[<a onClick={()=>{
                          // copyToClipboard(localStorage.getItem('token')).then(res=>{
                          //     message.success('已经复制', 1)
                          // })
                      }}>复制</a>]}>
                          <List.Item.Meta
                              title={<span>鉴权令牌</span>}
                              description={<div className={'ellipsis'}>上报覆盖率时所需要的鉴权令牌 {localStorage.getItem('token')}</div>}
                          />
                      </List.Item>
                  </div>)}
          />
      </div>
  );
};

export default SecuritySettings;
