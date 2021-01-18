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

const AmbassadorView = ({ get, match, makePayment }) => {
  const [data, setData] = useState(null);
  const [generalData, setGeneralData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [bankData, setBankData] = useState(null);
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
    get(match.params.id, match.params.type)
      .then((result) => {
        setLoadData(result);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, [get, match.params.id, match.params.type]);

  console.log(data);

  const setLoadData = (result) => {
    setData(result.data);
    const data1 = result.data;
    setGeneralData({
      "Ambassador Id": data1.ambass_id,
      Extention: data1.extention,
      "First Name": data1.fname,
      "Last Name": data1.lname,
      Profession: data1.profession,
      Email: data1.email,
      Website: data1.website,
      "Phone Number": data1.phonenumber,
      Instagram: data1.instagram,
      Facebook: data1.facebook,
      "Zip Code": data1.zipcode,
      "Network Size": data1.networksize,
      "Why do i want to be an Ambassador": data1.why,
      Status: data1.status ? "True" : "False",
      "Created On": data1.createdon,
    });
    setAccountData({
      Name: data1.account ? data1.account.name : "",
      State: data1.account ? data1.account.state : "",
      Phone: data1.account ? data1.account.phone : "",
      City: data1.account ? data1.account.city : "",
      Zipcode: data1.account ? data1.account.zipcode : "",
      Fax: data1.account ? data1.account.fax : "",
      Currency: data1.account ? data1.account.currency : "",
      Region: data1.account ? data1.account.region : "",
      Country: data1.account ? data1.account.country : "",
      Address: data1.account ? data1.account.address : "",
    });
    setBankData({
      "Account Number": data1.bank ? data1.bank.accountNumber : "",
      "Payment Method": data1.bank ? data1.bank.paymentMethod : "",
      "Account Name": data1.bank ? data1.bank.accName : "",
      "Routing Type": data1.bank ? data1.bank.routingType : "",
      "Bank Name": data1.bank ? data1.bank.bankName : "",
      "Account Type": data1.bank ? data1.bank.accType : "",
      "Minimum Pay Amount": data1.bank ? data1.bank.minPayAmt : "",
      Currency: data1.bank ? data1.bank.currency : "",
    });
    setTaxData({
      Name: data1.tax ? data1.tax.name : "",
      "Payment Method": data1.tax ? data1.tax.businessType : "",
      "Account Name": data1.tax ? data1.tax.address : "",
      "Routing Type": data1.tax ? data1.tax.city : "",
      "Bank Name": data1.tax ? data1.tax.zipcode : "",
    });
    cogoToast.success(result.message);
    setLoading(false);
  };

  const handlePayment = (id, _id) => {
    setLoading(true);
    makePayment(id, _id)
      .then((result) => {
        setLoadData(result);
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
      <h4 style={{ marginBottom: "30px" }}>GENERAL DETAILS</h4>
      {generalData && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridRowGap: "10px",
            }}
          >
            {Object.keys(generalData).map((item) => (
              <p>
                <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                  {item}:
                </span>
                <span>{generalData[item]}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      <h4 style={{ marginBottom: "30px", marginTop: "30px" }}>
        ACCOUNT DETAILS
      </h4>
      {accountData && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridRowGap: "10px",
            }}
          >
            {Object.keys(accountData).map((item) => (
              <p>
                <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                  {item}:
                </span>
                <span>{accountData[item]}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      <h4 style={{ marginBottom: "30px", marginTop: "30px" }}>BANK DETAILS</h4>
      {bankData && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridRowGap: "10px",
            }}
          >
            {Object.keys(bankData).map((item) => (
              <p>
                <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                  {item}:
                </span>
                <span>{bankData[item]}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      <h4 style={{ marginBottom: "30px", marginTop: "30px" }}>TAX DETAILS</h4>
      {taxData && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridRowGap: "10px",
            }}
          >
            {Object.keys(taxData).map((item) => (
              <p>
                <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                  {item}:
                </span>
                <span>{taxData[item]}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: "flex", marginTop: "30px" }}>
        <ExportCSV
          csvData={data.urlvisits.map((item) => {
            return {
              url: item.url,
              refer_url: item.refer_url,
              converted: item.converted ? "true" : "false",
              date: item.date,
              orderid: item.orderid,
              amount: item.amount,
              status: item.paid ? "Paid" : "Not Paid",
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
          filename="All Ambassadors.pdf"
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
      <div style={{ marginTop: "30px" }} ref={ref1}>
        <Table
          onPay={handlePayment}
          type="ambassadorPay"
          data={data.urlvisits.map((item) => {
            return {
              url: item.url,
              refer_url: item.refer_url,
              converted: item.converted ? "true" : "false",
              date: item.date,
              // orderid: item.orderid,
              amount: item.amount,
              status: item.paid ? "Paid" : "Not Paid",
              _id: item._id,
              ambassId: match.params.id,
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={[
            "url",
            "refer_url",
            "converted",
            "date",
            // "orderid",
            "amount",
            "status",
          ]}
          titles={[
            "URL",
            "refer URL",
            "Converted",
            "Create on",
            // "Order ID",
            "Amount",
            "Status",
          ]}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: (id, type) => dispatch(actionCreators.getAmbassadorDetails(id, type)),
    makePayment: (id, _id) => dispatch(actionCreators.makePayment(id, _id)),
  };
};

export default connect(null, mapDispatchToProps)(AmbassadorView);
