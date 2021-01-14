import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/product";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal, InputNumber } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";

const AttributeTerm = ({ get, add, deletee, edit, match }) => {
  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState([]);
  const [attribute, setAttribute] = useState({});
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
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
    get(match.params.id)
      .then((result) => {
        setLoading(false);
        cogoToast.success(result.message);
        setTerms(result.terms);
        setAttribute(result.attribute);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, [get]);
  const onFinish = (values) => {
    setOpen(false);
    setLoading(true);
    console.log(values);
    add(values)
      .then((result) => {
        setLoading(false);
        cogoToast.success(result);
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

  const removeAttributeTerm = (id) => {
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
          onClick={() => {
            setOpen(true);
          }}
          type="primary"
        >
          <PlusOutlined style={{ marginRight: "10px" }} />
          Add Attribute Term
        </Button>
      </div>
      <ExportCSV
        csvData={Object.keys(terms).map((item) => {
          return {
            "Sno.": item.vendorid,
            Name: item.vendorname,
          };
        })}
        fileName="All Attribute Terms"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All Attribute Terms.pdf"
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
          onDelete={removeAttributeTerm}
          data={Object.keys(terms).map((slug) => terms[slug])}
          setPdf={pdf}
          ref={ref}
          columns={["name", "slug", "description"]}
          titles={["Name", "Slug", "Description"]}
        />
      </div>
      <Modal
        visible={open}
        title={"Add New Attribute Term"}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
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
            <Button type="primary" htmlType="submit">
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
    attributeTerms: state.productReducer.attributeTerms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: (id) => dispatch(actionCreators.getAttributeTerms(id)),
    // edit: (data, id) => dispatch(actionCreators.edit(data, id)),
    // deletee: (id) => dispatch(actionCreators.deletee(id)),
    // add: (data) => dispatch(actionCreators.add(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeTerm);
