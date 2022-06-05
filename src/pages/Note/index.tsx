import React, { useRef } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, Divider, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import CalendarService from "../../services/CalendarService";
import "./index.less";
import moment from "moment";
import NoteService from "../../services/NoteService";

export type TableListItem = {
  id: number;
  proposal: string;
  content: string;
  from: string;
  profession: string;
  author: string;
  authorOriginName: string;
};

const Note: React.FC = () => {
  const ref = useRef<any>();
  const history = useNavigate();
  const columns: ProColumns<TableListItem>[] = [
    { search: false, title: "主题", dataIndex: "title" },
    { search: false, title: "内容", dataIndex: "content", ellipsis: true },
    { search: false, title: "出自", dataIndex: "reference" },
    { search: false, title: "作者名字", dataIndex: "author" },
    { search: false, title: "作者职业", dataIndex: "occupation" },
    {
      search: false,
      title: "状态",
      dataIndex: "status",
      valueEnum: {
        0: { text: "审核中", status: "Processing" },
        1: { text: "审核通过", status: "Success" },
        2: { text: "审核未通过", status: "Error" },
      },
    },
    { search: false, title: "创建人", dataIndex: "creator" },
    {
      search: false,
      title: "创建时间",
      dataIndex: "createdAt",
      render(item: any) {
        return moment(item).add(8, "h").format("YYYY-MM-DD HH:mm");
      },
    },
    {
      search: false,
      title: "更新时间",
      dataIndex: "updatedAt",
      render(item: any) {
        return moment(item).add(8, "h").format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "操作",
      search: false,
      render(_, tableListItem) {
        return (
          <div>
            <a
              onClick={() => {
                history(`/note/detail/${tableListItem.id}`)
              }}
            >
              查看
            </a>
            <Divider type="vertical" />
            <a
                onClick={() => {
                  history(`/note/edit/${tableListItem.id}`)
                }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除?"
              onConfirm={() => {
                CalendarService.deleteACalendar({ id: tableListItem.id }).then(() => {
                  message.success('删除成功')
                  ref.current.reload()
                })
              }}
              onCancel={() => {
                console.log(1)
              }}
              okText="Yes"
              cancelText="No"
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const toolbarrender = () => [
    <Button
      type="primary"
      onClick={() => {
        history(`/note/-1`)
      }}
    >
      新增
    </Button>,
  ];
  return (
    <div>
      <ProTable<TableListItem>
        search={false}
        columns={columns}
        actionRef={ref}
        rowKey="id"
        pagination={{
          pageSize:200,
          showQuickJumper: true,
        }}
        request={() => {
          return NoteService.listNote().then((res) => {
            return {
              data: res,
              success: true,
            }
          })
        }}
        dateFormatter="string"
        toolBarRender={toolbarrender}
      />
    </div>
  );
};

export default Note;
