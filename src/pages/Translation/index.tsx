import React, { useRef } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, Divider, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import CalendarService from "../../services/CalendarService";
import "./index.less";
import moment from "moment";

export type TableListItem = {
  id: number;
  proposal: string;
  content: string;
  from: string;
  profession: string;
  author: string;
  authorOriginName: string;
};

const Translation: React.FC = () => {
  const ref = useRef<any>();
  const history = useNavigate();
  const columns: ProColumns<TableListItem>[] = [
    { search: false, title: "键名", dataIndex: "tKey" },
    { search: false, title: "简体中文", dataIndex: "zh" },
    { search: false, title: "繁体中文", dataIndex: "hk" },
    { search: false, title: "英文", dataIndex: "en" },
    { search: false, title: "韩文", dataIndex: "kr" },
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
                history(`/translation/${tableListItem.id}`)
              }}
            >
              查看
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
        history(`/translation/-1`)
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
          return CalendarService.listCalendar().then((res) => {
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

export default Translation;
