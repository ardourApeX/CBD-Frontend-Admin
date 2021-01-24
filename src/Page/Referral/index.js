import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/affiliation";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";

const Referral = ({ get }) => {
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
        setData(result.data);
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
      <div style={{ display: "flex" }}>
        <ExportCSV
          csvData={data.map((item) => {
            return {
              URL: item.url,
              "Refer URL": item.refer_url,
              Converted: item.converted ? "True" : "False",
              OrderId: item.orderid,
              Amount: item.amount,
              Date: item.date,
              Status: item.paid ? "Paid" : "Not Paid",
            };
          })}
          fileName="All Referrals"
        />
        <ReactToPdf
          x={0}
          y={0}
          scale={1}
          onComplete={() => setPdf(true)}
          options={options}
          targetRef={ref1}
          filename="All Referrals.pdf"
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
      </div>
      <div ref={ref1}>
        <Table
          data={data.map((item) => {
            return {
              url: item.url,
              refer_url: item.refer_url,
              converted: item.converted ? "True" : "False",
              orderid: item.orderid,
              amount: item.amount,
              date: new Date(item.date).toDateString(),
              status: item.paid ? "Paid" : "Not Paid",
              _id: item._id,
            };
          })}
          setPdf={pdf}
          type="referrals"
          onEdit={() => console.log("clicked")}
          ref={ref}
          columns={[
            "url",
            "refer_url",
            "converted",
            "amount",
            "date",
            "status",
          ]}
          titles={["URL", "Refer URL", "Converted", "Amount", "Date", "Status"]}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getReferals()),
  };
};

export default connect(null, mapDispatchToProps)(Referral);
