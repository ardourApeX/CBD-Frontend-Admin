import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/product";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";

const SubscribedProducts = ({ products, get, add, deletee, edit }) => {
  console.log(products);
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
    get()
      .then((result) => {
        setLoading(false);
        cogoToast.success(result);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, [get]);

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
      <div style={{ display: "flex" }}></div>
      <ExportCSV
        csvData={products.map((item) => {
          return {
            "Product Name": item.title,
            "Delivery Date": item.createdOn,
            Quantity: item.qty,
            "Unit Price": item.unitPrice,
            "Subscription Status": item.subscriptionFailed
              ? "Subscription Failed"
              : "Subscribed",
          };
        })}
        fileName="All Subscribed products"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All Subscribed products.pdf"
      >
        {({ toPdf }) => (
          <Button
            size="sm"
            style={{ marginRight: "20px" }}
            variant="dark"
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
          return (
            <Button size="sm" variant="dark">
              PRINT
            </Button>
          );
        }}
        content={() => ref.current}
      />
      <div ref={ref1}>
        <Table
          data={products.map((item) => {
            return {
              ...item,
              isSubscribed: item.subscriptionFailed
                ? "Subscription Failed"
                : "Subscribed",
              createdOn: new Date(item.createdOn).toDateString(),
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["title", "createdOn", "qty", "unitPrice", "isSubscribed"]}
          titles={[
            "Product Name",
            "Delivery Date",
            "Quantity",
            "Unit Price",
            "Subscription Status",
          ]}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.subscribedProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getSubscribedProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribedProducts);
