import ProForm, { ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { Button, message, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ImgCrop from "antd-img-crop";
import util from "../../../utils/util";
import axios from "axios";
import CalendarService from "../../../services/CalendarService";
import UserService from "../../../services/UserService";
import { size } from "lodash";
import { DownloadOutlined } from "@ant-design/icons";

const BasicSettings = () => {
  const [userId, setUserId] = useState(-1);
  const [imageUrl, setImageUrl] = useState("");
  const formRef = useRef<
    ProFormInstance<{ email: string; nickname: string; lang: string }>
  >();

  useEffect(
    () => {
      UserService
        .getPersonalInfoThroughToken()
        .then((res) => {
          console.log(res);
          formRef.current?.setFieldsValue({
            email: res.email,
            nickname: res.nickname,
            lang: res.lang,
          });

          setUserId(res.id);

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

  const onChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      console.log(info);
      setImageUrl(util.genUrl(info.file.response.generatedMaps[0]));
    }
  };
  return (
    <div style={{display:'flex'}}>
          <ProForm<{
              name: string;
              company?: string;
              useMode?: string;
          }>
              onFinish={async (values) => {
                  // await waitTime(100)
                  const val2 = await formRef.current?.validateFieldsReturnFormatValue?.()
                  await UserService.modifyUserinfo({
                      ...val2,
                      id: userId,
                  })

                  message.success('更新')
              }}
              formRef={formRef}
              params={{ id: '100' }}
              formKey="base-form-use-demo"
              dateFormatter={(value, valueType) => {
                  console.log('---->', value, valueType);
                  return value.format('YYYY/MM/DD HH:mm:ss');
              }}
              request={async () => {
                  return {
                      name: '蚂蚁设计有限公司',
                      useMode: 'chapter',
                  };
              }}
              autoFocusFirstInput
          >
              <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" />
              <ProFormText width="md" name="nickname" label="昵称" placeholder="请输入昵称" />
              <ProFormSelect options={[  {
                  label: '简体中文',
                  value:'zh'
              },
                  {
                      label: 'English',
                      value:'en'
                  },
                  {
                      label: '繁體中文',
                      value:'hk'
                  },
                  {
                      label: '한글',
                      value:'kr'
                  }]} width="md" name="lang" label="语言" placeholder="请选择语言" />
          </ProForm>

          <div style={{marginLeft:'80px',display:'flex',flexDirection:'column',alignItems:'center'}}>
              {/*<p>背景图片</p>*/}
              <img src={imageUrl} alt="avatar" style={{ width: '144px',marginBottom:'14px',borderRadius:'50%' }} />
              <ImgCrop rotate aspect={1}>
                  <Upload
                      action="http://public-api.rico.org.cn/file/upload"
                      onChange={onChange}
                      showUploadList={false}
                      beforeUpload={(f) => util.yasuo(f)}
                      data={{ label: userId, bucket: 'qingkong-avatar' }}
                  >

                      <Button type="default" icon={<DownloadOutlined />}>
                          更换头像
                      </Button>
                  </Upload>
              </ImgCrop>
          </div>
      </div>
  );
};

export default BasicSettings;
