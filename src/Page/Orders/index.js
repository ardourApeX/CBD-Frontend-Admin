import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import axios from "axios";
import { BACK_END_URL } from "../../utilities/Axios/url";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef();
  const ref1 = useRef();
  const [pdf, setPdf] = useState(true);
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [595.28, 841.89],
    compress: true,
  };
  useEffect(() => {
    axios
      .get(`${BACK_END_URL}/pages/getOrders`)
      .then((result) => {
        console.log(result.data.orders);
        setOrders(result.data.orders);
        setLoading(false);
        cogoToast.success("Orders Fetched Successfully");
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, []);

  const removeOrder = (id) => {
    setLoading(true);
    axios
      .get(`${BACK_END_URL}/pages/deleteOrder/${id}`)
      .then((result) => {
        setLoading(false);
        cogoToast.success("Order Deleted Successfully");
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  };

  return loading ? (
    <div>
      <Spinner
        animation="border"
        style={{ position: "fixed", top: "20%", left: "60%" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div>
      <ExportCSV
        csvData={orders.map((item) => {
          return {
            "Customer Email": item.userDetails ? item.userDetails.email : "",
            "Customer Mobile Number": item.userDetails
              ? item.userDetails.phonenumber
              : "",
            "Payment Status": item.orderStatus,
            "Total Amount": item.grandTotal,
            Status: item.status,
            "Date Created": item.createdOn,
          };
        })}
        fileName="All orders"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All orders.pdf"
      >
        {({ toPdf }) => (
          <Button
            style={{ marginRight: "20px" }}
            type="primary"
            onClick={async () => {
              setPdf(false);
              setTimeout(toPdf, 500);
            }}
          >
            PDF
          </Button>
        )}
      </ReactToPdf>
      <ReactToPrint
        onBeforeGetContent={() => setPdf(false)}
        onAfterPrint={() => setPdf(true)}
        trigger={() => {
          // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
          // to the root node of the returned component as it will be overwritten.
          return <Button type="primary">PRINT</Button>;
        }}
        content={() => ref.current}
      />
      <div ref={ref1}>
        <Table
          onDelete={removeOrder}
          data={orders.map((item) => {
            return {
              email: item.userDetails ? item.userDetails.email : "",
              phoneNumber: item.userDetails ? item.userDetails.phonenumber : "",
              paymentStatus: item.orderStatus,
              amount: item.grandTotal,
              status: item.status,
              date: item.createdOn,
              _id: item._id,
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={[
            "email",
            "phoneNumber",
            "paymentStatus",
            "amount",
            "status",
            "date",
          ]}
          titles={[
            "Customer Email",
            "Customer Mobile Number",
            "Payment Status",
            "Total Amount",
            "Status",
            "Date Created",
          ]}
        />
      </div>
    </div>
  );
};

export default Order;
