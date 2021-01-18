import React from "react";
import { useEffect } from "react";
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
import axios from "axios";
import { BACK_END_URL } from "../../utilities/Axios/url";

const User = () => {
  const [users, setusers] = useState([]);
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
      .get(`${BACK_END_URL}/users/getUsers`)
      .then((result) => {
        console.log(result.data.users);
        setusers(result.data.users);
        setLoading(false);
        cogoToast.success("Users fetched Successfully");
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, []);

  const removeUser = (id) => {
    setLoading(true);
    axios
      .get(`${BACK_END_URL}/users/usermanagement/delete/${id}`)
      .then((result) => {
        setusers(users.filter((item) => item._id !== id));
        setLoading(false);
        cogoToast.success("User Deleted Successfully");
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
        csvData={users.map((item) => {
          return {
            Email: item.email,
            Role: item.role,
            "Phone Number": item.phonenumber,
            "Created On": new Date(item.createdDate).toDateString(),
            Status: item.status,
          };
        })}
        fileName="All users"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All users.pdf"
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
          onDelete={removeUser}
          data={users.map((item) => {
            return {
              email: item.email,
              role: item.role,
              phonenumber: item.phonenumber,
              createdDate: new Date(item.createdDate).toString(),
              status: item.status,
              _id: item._id,
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["email", "role", "phonenumber", "createdDate", "status"]}
          titles={["Email", "Role", "Phone Number", "Created On", "Status"]}
        />
      </div>
    </div>
  );
};

export default User;
