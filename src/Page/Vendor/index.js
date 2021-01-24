import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/vendor";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Modal, InputNumber } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";

const Vendor = ({ vendors, get, add, deletee, edit }) => {
  console.log(vendors);
  const [vendorsList, setVendorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [vendorId, setVendorId] = useState("");
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
  useEffect(() => {
    setVendorsList(vendors);
  }, [vendors]);
  const onFinish = (values) => {
    setOpen(false);
    setLoading(true);
    console.log(values);
    vendorId === ""
      ? add(values)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
          })
          .catch((err) => {
            setLoading(false);
            cogoToast.error(err);
          })
      : edit(values, vendorId)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
            setVendorId("");
          })
          .catch((err) => {
            setLoading(false);
            cogoToast.error(err);
          });
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    form.resetFields();
  };

  const removeVendor = (id) => {
    setLoading(true);
    deletee(id)
      .then((result) => {
        setLoading(false);
        cogoToast.success(result);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  };

  const closeModal = () => {
    form.resetFields();
    setOpen(false);
    setVendorId("");
  };

  const editVendor = (id) => {
    setVendorId(id);
    let vendor = vendors.filter((item) => item._id === id)[0];
    form.setFieldsValue({
      vendorname: vendor.vendorname,
      vendorid: vendor.vendorid,
    });
    setOpen(true);
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
      <div style={{ display: "flex" }}>
        <Button
          style={{
            marginLeft: "auto",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
          variant="dark"
        >
          <PlusOutlined style={{ marginRight: "10px" }} />
          Add Vendor
        </Button>
      </div>
      <ExportCSV
        csvData={vendorsList.map((item) => {
          return {
            "Sno.": item.vendorid,
            Name: item.vendorname,
          };
        })}
        fileName="All Vendors"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All Vendors.pdf"
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
          onEdit={editVendor}
          onDelete={removeVendor}
          data={vendorsList}
          setPdf={pdf}
          ref={ref}
          columns={["vendorid", "vendorname"]}
          titles={["ID", "Name"]}
        />
      </div>
      <Modal
        visible={open}
        title={vendorId !== "" ? "Edit Vendor" : "Add Vendor"}
        onCancel={closeModal}
        footer={[
          <Button size="sm" variant="dark" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Vendor ID"
            name="vendorid"
            rules={[
              {
                required: true,
                message: "Please input Vendor Id!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Vendor Name"
            name="vendorname"
            rules={[
              {
                required: true,
                message: "Please input Vendor Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button size="sm" variant="dark" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    vendors: state.vendorReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.get()),
    edit: (data, id) => dispatch(actionCreators.edit(data, id)),
    deletee: (id) => dispatch(actionCreators.deletee(id)),
    add: (data) => dispatch(actionCreators.add(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
