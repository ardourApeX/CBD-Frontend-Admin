import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/affiliation";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal, InputNumber, Upload } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";

const Vendor = ({ creatives, get, add, deletee }) => {
  console.log(creatives);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
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
    const formData = new FormData();
    Object.keys(values).map((key) => formData.append(key, values[key]));
    // if(image){
    //     formData.append("image", image)
    // }
    add(formData)
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
  };

  const closeModal = () => {
    form.resetFields();
    setOpen(false);
  };

  const removeCreative = (id) => {
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
          Add Creative
        </Button>
      </div>
      <ExportCSV
        csvData={creatives.map((item) => {
          return {
            Title: item.title,
            Link: item.link,
          };
        })}
        fileName="All creatives"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All creatives.pdf"
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
          onDelete={removeCreative}
          data={creatives}
          setPdf={pdf}
          ref={ref}
          columns={["title", "link"]}
          titles={["Title", "Link"]}
        />
      </div>
      <Modal
        visible={open}
        title={"Add Creative"}
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
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input title",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                message: "Please input Link",
              },
            ]}
          >
            <Input type="url" />
          </Form.Item>

          {/* <Form.Item label="Image" name="image">
            <div style={{ display: "flex" }}>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  setImage(file);
                  let reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setImageUrl(reader.result);
                  };
                  return false;
                }}
                multiple={false}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
            {imageUrl !== "" && (
              <div
                style={{
                  display: "flex",
                  marginTop: "30px",
                }}
              >
                <img
                  src={imageUrl}
                  alt="Product"
                  style={{
                    objectFit: "contain",
                    width: "200px",
                    height: "200px",
                    marginTop: "20px",
                    marginRight: "25px",
                  }}
                />
              </div>
            )}
          </Form.Item> */}

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
    creatives: state.ambassadorReducer.creatives,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getCreatives()),
    deletee: (id) => dispatch(actionCreators.deleteCreative(id)),
    add: (data) => dispatch(actionCreators.addCreative(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
