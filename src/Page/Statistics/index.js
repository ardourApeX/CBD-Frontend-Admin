import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/affiliation";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import CountUp from "react-countup";

const Statistics = ({ get }) => {
  const [data, setData] = useState({});
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
        const recievedResult = { ...result };
        delete recievedResult.message;
        setData(recievedResult);
        cogoToast.success(result.message);
        setLoading(false);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        {[
          { name: "visits", data: data.visits },
          { name: "products sold", data: data.productsSold },
          { name: "kits sold", data: data.kitsSold },
          { name: "total orders", data: data.orders },
        ].map((item) => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h1>
              <CountUp
                delay={1}
                start={0}
                end={item.data}
                duration={3}
                separator=","
              />
            </h1>
            <h5>{item.name}</h5>
          </div>
        ))}
      </div>
      <h4 style={{ marginBottom: "20px" }}>Products</h4>
      <div style={{ display: "flex" }}>
        <ExportCSV
          csvData={Object.keys(data.count1).map((item) => {
            return {
              "Product Name": item,
              "Number of times sold": data.count1[item],
            };
          })}
          fileName="All Products Sold"
        />
        <ReactToPdf
          x={0}
          y={0}
          scale={1}
          onComplete={() => setPdf(true)}
          options={options}
          targetRef={ref1}
          filename="All Products.pdf"
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
      </div>
      <div ref={ref1}>
        <Table
          data={Object.keys(data.count1).map((item) => {
            return {
              productName: item,
              numberOfTimesSold: data.count1[item],
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["productName", "numberOfTimesSold"]}
          titles={["Product Name", "Number of times sold"]}
        />
      </div>
      <h4 style={{ marginBottom: "20px" }}>Bundles</h4>
      <div style={{ display: "flex" }}>
        <ExportCSV
          csvData={Object.keys(data.count2).map((item) => {
            return {
              "Product Name": item,
              "Number of times sold": data.count2[item],
            };
          })}
          fileName="All Products Sold"
        />
        <ReactToPdf
          x={0}
          y={0}
          scale={1}
          onComplete={() => setPdf(true)}
          options={options}
          targetRef={ref1}
          filename="All Products.pdf"
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
      </div>
      <div ref={ref1}>
        <Table
          data={Object.keys(data.count2).map((item) => {
            return {
              productName: item,
              numberOfTimesSold: data.count2[item],
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["productName", "numberOfTimesSold"]}
          titles={["Product Name", "Number of times sold"]}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getStatistics()),
  };
};

export default connect(null, mapDispatchToProps)(Statistics);
