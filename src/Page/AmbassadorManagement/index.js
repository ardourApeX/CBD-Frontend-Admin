import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/affiliation";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal, InputNumber, Select } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import { Option } from "antd/lib/mentions";

const AmbassadorManagement = ({ ambassadors, get, add, deletee, edit }) => {
  console.log(ambassadors);
  const [loading, setLoading] = useState(true);
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
    console.log(values);
    add({ ...values, reactData: true })
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

  const removeAmbassador = (id) => {
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

  const editAmbassador = (id) => {
    console.log(id);
    setLoading(true);
    edit(id)
      .then((result) => {
        setLoading(false);
        cogoToast.success(true);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err.message);
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
          Add Ambassador
        </Button>
      </div>
      <ExportCSV
        csvData={ambassadors.map((item) => {
          return {
            Email: item.email,
            "Phone Number": item.phonenumber,
            "Created On": item.createdon,
            ID: item.ambass_id,
            Extention: item.extention,
            Approved: item.status ? "True" : "False",
          };
        })}
        fileName="All ambassadors"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All ambassadors.pdf"
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
          onEdit={editAmbassador}
          onDelete={removeAmbassador}
          type="ambassador"
          data={ambassadors.map((item) => {
            return {
              email: item.email,
              phonenumber: item.phonenumber,
              createdon: item.createdon,
              ambass_id: item.ambass_id,
              extention: item.extention,
              approvedAmbassador: item.status ? "True" : "False",
              status: item.status,
              _id: item._id,
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={[
            "email",
            "phonenumber",
            "createdon",
            "ambass_id",
            "extention",
            "approvedAmbassador",
          ]}
          titles={[
            "Email",
            "Phone Number",
            "Created On",
            "ID",
            "Extention",
            "Approved",
          ]}
        />
      </div>
      <Modal
        visible={open}
        title={"Add Ambassador"}
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please Enter Email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="First Name" name="firstname">
            <Input />
          </Form.Item>

          <Form.Item label="Last Name" name="lastname">
            <Input />
          </Form.Item>

          <Form.Item label="Profession" name="profession">
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>

          <Form.Item label="Confirm Password" name="password2">
            <Input type="password" />
          </Form.Item>

          <Form.Item label="Status" name="status" initialValue="false">
            <Select>
              <Option value="false">Inactive</Option>
              <Option value="true">Active</Option>
            </Select>
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
    ambassadors: state.ambassadorReducer.ambassadors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getAmbassadors()),
    edit: (id) => dispatch(actionCreators.editAmbassador(id)),
    deletee: (id) => dispatch(actionCreators.deleteAmbassador(id)),
    add: (data) => dispatch(actionCreators.addAmbassador(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmbassadorManagement);
