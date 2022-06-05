import { useEffect, useRef, useState } from "react";
import { message, Upload } from "antd";
import type { ProFormInstance } from "@ant-design/pro-form";
import ProForm, { ProFormText, ProFormDatePicker, ProFormTextArea } from "@ant-design/pro-form";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import CalendarService from "../../services/CalendarService";
import util from "../../utils/util";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(true);
      },
      time,
    );
  });
};

export default () => {
  const params = useParams();
  const formRef: any = useRef<ProFormInstance<any>>();
  const history = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [background, setBackground] = useState("#000000");
  useEffect(
    () => {
      if (params.id !== "-1") {
        CalendarService
          .retrieveACalendar({ id: Number(params.id) })
          .then((res) => {
            setBackground(res.background || "#000000");
            formRef.current?.setFieldsValue({
              tKey: res.tKey,
              zh: res.zh,
              hk: res.hk,
              en: res.en,
              kr: res.kr,
            });
          });
      } else {
        formRef.current?.setFieldsValue({
          tKey: "",
          zh: "",
          hk: "",
          en: "",
          kr: "",
        });
      }
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
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <ProForm<any>
        onFinish={async () => {
          await waitTime(100)
          const val2 = await formRef.current?.validateFieldsReturnFormatValue?.()
          if (params.id === '-1') {
            CalendarService.createACalendar({
              ...val2,
              background,
            }).then((res) => {
              message.success('新增成功，现可以编辑背景图片')
              history(`/translation/${res.id}`)
            })
          } else {
            await CalendarService.updateACalendar({
              ...val2,
              background,
              id: params.id,
            })

            message.success('更新')
          }
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        autoFocusFirstInput
      >
        <ProForm.Group>
          <ProFormText width="md" name="tKey" label="键名" placeholder="键名" />
          <ProFormTextArea width="md" name="zh" label="简体中文" placeholder="简体中文" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="hk" label="繁体中文" placeholder="繁体中文" />
          <ProFormText width="md" name="en" label="英文" placeholder="英文" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="kr" label="韩文" placeholder="韩文" />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};
