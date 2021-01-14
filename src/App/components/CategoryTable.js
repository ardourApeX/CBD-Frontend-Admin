import React from "react";
import { Table, Space, Button } from "antd";
import "antd/dist/antd.css";
import { CheckOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Component } from "react";
import { Link } from "react-router-dom";
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
                title={titles[index]}
                dataIndex={column}
                key={titles[index]}
              />
            </>
          ))}
          {type === "attribute" ? (
            <Column
              title="Terms"
              render={(text, record) => (
                <>
                  <ol type="1">
                    {Object.keys(record.terms).map((term) => (
                      <li key={record.terms[term].slug}>
                        {record.terms[term].name}
                      </li>
                    ))}
                  </ol>
                  <Link to={`/Attribute/AttributeTerm/${record._id}`}>
                    Configure terms
                  </Link>
                </>
              )}
            />
          ) : null}
          {type === "ambassador" ? (
            <Column
              title="Expand"
              render={(text, record) => (
                <>
                  <Link to={`/Ambassador/view/${record._id}`}>View</Link>
                </>
              )}
            />
          ) : null}
          {(onEdit || onDelete) && setPdf ? (
            <Column
              title="Actions"
              render={(text, record) => (
                <Space size="middle">
                  {!record.approved && onEdit ? (
                    type === "review" ? (
                      <CheckOutlined onClick={() => onEdit(record._id)} />
                    ) : record.status === true ? null : type ===
                      "ambassador" ? (
                      <Button type="primary" onClick={() => onEdit(record._id)}>
                        Approve
                      </Button>
                    ) : (
                      <EditFilled onClick={() => onEdit(record._id)} />
                    )
                  ) : null}
                  {onDelete ? (
                    <DeleteFilled onClick={() => onDelete(record._id)} />
                  ) : null}
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
