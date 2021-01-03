import React from "react";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const { Column } = Table;

const CategoryTable = ({ categories, onDelete, onEdit }) => {
  return (
    <Table dataSource={categories}>
      <Column title="S No." dataIndex="categoryid" key="S No." />
      {/* <Column title="Image" dataIndex="Image" key="Image" /> */}
      <Column title="Name" dataIndex="categorytitle" key="Name" />
      <Column
        title="Description"
        dataIndex="catdescription"
        key="Description"
      />
      <Column
        title="Actions"
        render={(text, record) => (
          <Space size="middle">
            <EditFilled onClick={() => onEdit(record._id)} />
            <DeleteFilled onClick={() => onDelete(record._id)} />
          </Space>
        )}
        key="Actions"
      />
    </Table>
  );
};

export default CategoryTable;
