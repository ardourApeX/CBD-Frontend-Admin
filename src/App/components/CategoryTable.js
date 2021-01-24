import React from "react";
import { Table, Space } from "antd";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import { CheckOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

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
      onPay,
    } = this.props;

    const handleSearch = (input) => {
      input !== ""
        ? this.setState({
            tableData: this.props.data.filter((item) => {
              console.log(item);
              return columns.some((key) => {
                console.log(key);
                return (
                  item[key] &&
                  item[key]
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                );
              });
            }),
          })
        : this.setState({ tableData: this.props.data });
    };

    return (
      <>
        <SearchBar onChange={handleSearch} />
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
                    <Link
                      style={{ color: "gray", textDecoration: "underline" }}
                      to={`/Attribute/AttributeTerm/${record._id}`}
                    >
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
                    <Link
                      style={{ color: "gray", textDecoration: "underline" }}
                      to={`/Ambassador/view/${record._id}`}
                    >
                      View
                    </Link>
                  </>
                )}
              />
            ) : null}
            {type === "referrals" || type === "ambassadorPay" ? (
              <Column
                title="Order ID"
                render={(text, record) =>
                  record.orderid && (
                    <Link
                      style={{ color: "gray", textDecoration: "underline" }}
                      to={`/Order/${record.orderid}`}
                    >
                      View Order
                    </Link>
                  )
                }
              />
            ) : null}
            {(onEdit || onDelete || onPay) && setPdf ? (
              <Column
                title="Actions"
                render={(text, record) => (
                  <Space size="middle">
                    {!record.approved && onEdit ? (
                      type === "review" ? (
                        <CheckOutlined onClick={() => onEdit(record._id)} />
                      ) : type === "ambassador" ? (
                        !record.status ? (
                          <Button
                            variant="dark"
                            size="sm"
                            onClick={() => onEdit(record._id, "approve")}
                          >
                            Approve
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onEdit(record._id, "disapprove")}
                          >
                            Disapprove
                          </Button>
                        )
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
                    {record.converted === "true" &&
                    onPay &&
                    record.status !== "Paid" ? (
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => onPay(record._id, record.ambassId)}
                      >
                        Mark As Paid
                      </Button>
                    ) : onPay ? (
                      <p>No Action Required</p>
                    ) : null}
                  </Space>
                )}
                key="Actions"
              />
            ) : null}
          </Table>
        </div>
      </>
    );
  }
}

export default CategoryTable;
