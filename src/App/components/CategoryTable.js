import React from "react";
import { Table, Space, Button } from "antd";
import "antd/dist/antd.css";
import { CheckOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Component } from "react";
import { Link } from "react-router-dom";
const { Column } = Table;

class CategoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.data,
    };
  }
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

    return (
      <div ref={ref}>
        <Table
          bordered
          size="small"
          pagination={{ pageSize: !setPdf ? data.length : 10 }}
          dataSource={this.state.tableData}
        >
          {columns.map((column, index) => (
            <>
              <Column
                sorter={(a, b) => {
                  if (
                    column === "packingid" ||
                    column === "vendorid" ||
                    column === "categoryid" ||
                    column === "attributeid" ||
                    column === "id" ||
                    column === "precent_off" ||
                    column === "duration_in_months" ||
                    column === "qty" ||
                    column === "unitPrice" ||
                    column === "ambass_id" ||
                    column === "amount"
                  ) {
                    return parseInt(a[column]) - parseInt(b[column]);
                  } else {
                    return (a[column] || "")
                      .toString()
                      .localeCompare((b[column] || "").toString());
                  }
                }}
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
          {type === "referrals" ? (
            <Column
              title="OrderId"
              render={(text, record) =>
                record.orderid && (
                  <Link to={`/Order/${record.orderid}`}>View Order</Link>
                )
              }
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
                    ) : type === "referrals" ? (
                      <Link to={`/Referrals/view/${record._id}`}>
                        View Profile
                      </Link>
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
