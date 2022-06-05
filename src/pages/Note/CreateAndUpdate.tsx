import React, { useEffect, useRef, useState } from "react";
import { message, Upload } from "antd";
import type { ProFormInstance } from "@ant-design/pro-form";
import ProForm, {
  ProFormText,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormSelect,
} from "@ant-design/pro-form";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import CalendarService from "../../services/CalendarService";
import util from "../../utils/util";
import NoteService from "../../services/NoteService";
import NoteDetail from "./NoteDetail/NoteDetail";
import { Comment, Avatar } from "antd";

const ExampleComment = ({ children }) => (
  <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        }
    >
      {children}
    </Comment>
);

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
  const [detail, setDetail] = useState({});
  const params = useParams();
  const formRef: any = useRef<ProFormInstance<any>>();
  const history = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [background, setBackground] = useState("#000000");
  useEffect(
    () => {
      if (params.id !== "-1") {
        NoteService
          .retrieveANote({ noteId: Number(params.id) })
          .then((res) => {
            setBackground(res.background || "#000000");
            formRef.current?.setFieldsValue({
              "title": res.title,
              "content": res.content,
              "reference": res.reference,
              "author": res.author,
              "occupation": res.occupation,
              "status": res.status,
            });
            setDetail(res);
          });
      } else {
        formRef.current?.setFieldsValue({
          "title": "",
          "content": "",
          "reference": "",
          "author": "",
          "occupation": "",
          "status": 0,
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
    <div style={{ backgroundColor: 'white', padding: '20px',display:'flex',justifyContent:'space-between' }}>
      <ProForm<any>
        onFinish={async () => {
          await waitTime(100)
          const val2 = await formRef.current?.validateFieldsReturnFormatValue?.()
          if (params.id === '-1') {
            NoteService.createANote({
              ...val2,
            }).then((res) => {
              message.success('新增成功，现可以编辑背景图片')
              history(`/note/${res.id}`)
            })
          } else {
            await NoteService.updateANote({
              ...val2,
              noteId: params.id,
            })

            message.success('更新')
          }
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        autoFocusFirstInput
        style={{marginRight:'40px'}}
      >
        <ProForm.Group>
          <ProFormText width="md" name="title" label="title" placeholder="title" />
          <ProFormTextArea width="md" name="content" label="content" placeholder="content" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="reference" label="出自" placeholder="出自" />
          <ProFormText width="md" name="author" label="作者" placeholder="作者" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="occupation" label="作者职业" placeholder="作者职业" />
          <ProFormSelect options={[{
            label:'审核中',
            value:0
          },
            {
              label:'审核通过',
              value:1
            },
            {
              label:'审核未通过',
              value:2
            }]} width="md" name="status" label="状态" placeholder="状态" />
        </ProForm.Group>
        {/*<ProForm.Group>*/}
        {/*  <ProFormText width="md" name="status" label="状态" placeholder="状态" />*/}
        {/*</ProForm.Group>*/}
      </ProForm>

      <NoteDetail detail={detail}/>

      <div style={{width:'375px',border:'1px solid #eee',padding:'14px'}}>
        <ExampleComment>
          <ExampleComment>
          </ExampleComment>
          <ExampleComment>
          </ExampleComment>
        </ExampleComment>
      </div>

    </div>
  );
};
