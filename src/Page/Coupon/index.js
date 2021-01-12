import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/coupon";
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

const Coupon = ({ coupons, get, add, deletee }) => {
  console.log(coupons);
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

  const removeCoupon = (id) => {
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
          Add Coupon
        </Button>
      </div>
      <ExportCSV
        csvData={coupons.map((item) => {
          return {
            Name: item.id,
            Duration: item.duration_in_months,
            Type: item.duration,
            "Percnetage Off": item.percnet_off,
          };
        })}
        fileName="All coupons"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All coupons.pdf"
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
          onDelete={removeCoupon}
          data={coupons.map((item) => {
            const { id, duration_in_months, duration, percent_off } = item;
            return {
              id,
              duration_in_months,
              duration,
              percent_off,
              _id: id,
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["id", "duration_in_months", "duration", "percent_off"]}
          titles={["Name", "Duration", "Type", "Percentage Off"]}
        />
      </div>
      <Modal
        visible={open}
        title="Add Vendor"
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
            label="Coupon Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Coupon Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Duration in Months"
            name="months"
            initialValue="1"
            rules={[
              {
                required: true,
                message: "Please select Duration",
              },
            ]}
          >
            <Select>
              {[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
              ].map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Duration in Months"
            name="duration"
            initialValue="once"
            rules={[
              {
                required: true,
                message: "Please select Duration",
              },
            ]}
          >
            <Select>
              {["Once", "Repeating", "Forever"].map((item) => {
                let name = item.split("");
                name[0] = name[0].toLowerCase();
                name = name.join("");
                console.log(name);
                return (
                  <Option key={name} value={name}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Percentage Off"
            name="percentoff"
            rules={[
              {
                required: true,
                message: "Please input Discount Percentage",
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
    coupons: state.couponReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getCoupons()),
    deletee: (id) => dispatch(actionCreators.deleteCoupon(id)),
    add: (data) => dispatch(actionCreators.addCoupon(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupon);
