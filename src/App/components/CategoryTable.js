import React from "react";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import { CheckOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Component } from "react";
const { Column } = Table;

class CategoryTable extends Component {
  render() {
    const {
      data,
      setPdf,
      ref,
      onEdit,
      onDelete,
      columns,
      titles,
      type,
    } = this.props;
    console.log(type);
    return (
      <div ref={ref}>
        <Table
          bordered
          size="small"
          pagination={{ pageSize: !setPdf ? data.length : 10 }}
          dataSource={data}
        >
          {columns.map((column, index) => (
            <>
              <Column
                className="antd-table"
                title={titles[index]}
                dataIndex={column}
                key={titles[index]}
              />
            </>
          ))}
          {setPdf ? (
            <Column
              title="Actions"
              render={(text, record) => (
                <Space size="middle">
                  {!record.approved && onEdit ? (
                    type === "review" ? (
                      <CheckOutlined onClick={() => onEdit(record._id)} />
                    ) : (
                      <EditFilled onClick={() => onEdit(record._id)} />
                    )
                  ) : null}
                  <DeleteFilled onClick={() => onDelete(record._id)} />
                </Space>
              )}
              key="Actions"
            />
          ) : null}
        </Table>
      </div>
    );
  }
}

export default CategoryTable;
