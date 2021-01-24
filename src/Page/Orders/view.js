import React from "react";
import { useEffect } from "react";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import axios from "axios";
import { BACK_END_URL } from "../../utilities/Axios/url";

const OrderView = ({ match }) => {
  const [order, setOrder] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [taxData, setTaxData] = useState(null);
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
      .get(`${BACK_END_URL}/pages/viewOrder/${match.params.id}`)
      .then((result) => {
        console.log(result.data.orders[0]);
        setOrder(result.data.orders[0]);
        const data1 = result.data;
        setProductsData(
          result.data.orders[0].products.map((product) => {
            return {
              "Subscription Meta": product.subscriptionMeta,
              Title: product.title,
              "Reviewed By User": product.reviewed ? "True" : "False",
              Quantity: product.qty,
              "Unit Price": product.unitPrice,
              "Sub Total": product.subTotal,
            };
          })
        );
        setOrderData({
          "Grand Total": result.data.orders[0].total,
          "Wholesub Total": result.data.orders[0].wholeSubtotal,
          "Payment Method": result.data.orders[0].paymentMethod,
          Status: result.data.orders[0].status,
          "Transaction Id": result.data.orders[0].transactionId,
          "Country Tax": result.data.orders[0].countryTax,
          Carrier: result.data.orders[0].carrier,
        });
        setUserData({
          Country: result.data.orders[0].userDetails.country,
          Email: result.data.orders[0].userDetails.email,
          "First Name": result.data.orders[0].userDetails.firstname,
          "Last Name": result.data.orders[0].userDetails.lastname,
          "Shipping Address": result.data.orders[0].userDetails.shippingaddress,
          "Billing Address": result.data.orders[0].userDetails.billingaddress,
          State: result.data.orders[0].userDetails.state,
          Zipcode: result.data.orders[0].userDetails.zip,
          "Phone Number": result.data.orders[0].userDetails.phone,
        });
        cogoToast.success("Order Fetched Successfully");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, [match.params.id]);

  console.log(productsData);

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
      {order.carrier === "shipment_failed" && (
        <h3 style={{ fontWeight: "normal", marginBottom: "40px" }}>
          International Order
        </h3>
      )}
      <h3
        style={{
          marginBottom: "30px",
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        Ordered Product Details
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridRowGap: "30px",
        }}
      >
        {productsData &&
          productsData.map((product) => {
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                {Object.keys(product).map(
                  (item) =>
                    product[item] && (
                      <div>
                        <p>
                          <span
                            style={{ fontWeight: "bold", marginRight: "20px" }}
                          >
                            {item}:
                          </span>
                          <span>{product[item]}</span>
                        </p>
                      </div>
                    )
                )}
              </div>
            );
          })}
      </div>
      <h3
        style={{
          marginBottom: "30px",
          marginTop: "30px",
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        Order Details
      </h3>
      {orderData && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridRowGap: "10px",
            }}
          >
            {Object.keys(orderData).map((item) => (
              <p>
                <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                  {item}:
                </span>
                <span>{orderData[item]}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      <h3
        style={{
          marginBottom: "30px",
          marginTop: "30px",
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        User Details
      </h3>
      {userData && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridRowGap: "10px",
            }}
          >
            {Object.keys(userData).map((item) => (
              <p>
                <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                  {item}:
                </span>
                <span>{userData[item]}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      <h4 style={{ marginBottom: "30px", marginTop: "30px" }}>TAX DETAILS</h4>
      <p>
        <span style={{ fontWeight: "bold", marginRight: "20px" }}>
          Order Status:
        </span>
        <span>{order.status}</span>
      </p>
      <p>
        <span style={{ fontWeight: "bold", marginRight: "20px" }}>
          Order Date:
        </span>
        <span>{new Date(order.createdOn).toDateString()}</span>
      </p>
    </div>
  );
};

export default OrderView;
