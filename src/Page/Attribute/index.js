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

const Attribute = ({ attributes, get, add, deletee, edit }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [attributeId, setattributeId] = useState("");
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
  const onFinish = (values) => {
    setOpen(false);
    setLoading(true);
    attributeId === ""
      ? add(values)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
          })
          .catch((err) => {
            setLoading(false);
            cogoToast.error(err);
          })
      : edit(values, attributeId)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
            setattributeId("");
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

  const removeAttribute = (id) => {
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
    setattributeId("");
  };

  const editAttribute = (id) => {
    setattributeId(id);
    let attribute = attributes.filter((item) => item._id === id)[0];
    const { name, slug } = attribute;
    form.setFieldsValue({
      attributetitle: name,
      attributeslug: slug,
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
          onClick={() => {
            setOpen(true);
          }}
          type="primary"
        >
          <PlusOutlined style={{ marginRight: "10px" }} />
          Add Attribute
        </Button>
      </div>
      <ExportCSV
        csvData={attributes.map((item) => {
          return {
            ID: item.attributeid,
            Name: item.name,
          };
        })}
        fileName="All Attributes"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All Attributes.pdf"
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
          onEdit={editAttribute}
          onDelete={removeAttribute}
          data={attributes}
          setPdf={pdf}
          ref={ref}
          columns={["attributeid", "name", "terms"]}
          titles={["ID", "Name", "Terms"]}
        />
      </div>
      <Modal
        visible={open}
        title={attributeId !== "" ? "Edit Attribute" : "Add Attribute"}
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
            label="Name"
            name="attributetitle"
            rules={[
              {
                required: true,
                message: "Please input Attribute Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Slug" name="attributeslug">
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
    attributes: state.productReducer.attributes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getAttribute()),
    edit: (data, id) => dispatch(actionCreators.editAttribute(data, id)),
    deletee: (id) => dispatch(actionCreators.deleteAttribute(id)),
    add: (data) => dispatch(actionCreators.addAttribute(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attribute);
