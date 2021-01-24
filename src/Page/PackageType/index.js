import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/packageType";
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

const PackageType = ({ packageTypes, get, add, deletee, edit }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [PackageTypeId, setPackageTypeId] = useState("");
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
    PackageTypeId === ""
      ? add(values)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
          })
          .catch((err) => {
            setLoading(false);
            cogoToast.error(err);
          })
      : edit(values, PackageTypeId)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
            setPackageTypeId("");
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
    setPackageTypeId("");
  };

  const editVendor = (id) => {
    setPackageTypeId(id);
    let packageType = packageTypes.filter((item) => item._id === id)[0];
    const {
      packingid,
      packingtype,
      description,
      capacity,
      capcolor,
      capsize,
      capstyle,
      diameter,
      diptube,
      labelpaneldimension,
      height,
      containerweight,
      containervolume,
    } = packageType;
    form.setFieldsValue({
      packingid,
      packingtype,
      description,
      capacity,
      capcolor,
      capsize,
      capstyle,
      diameter,
      diptube,
      labelpaneldimension,
      height,
      containerweight,
      containervolume,
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
          size="sm"
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
          variant="dark"
        >
          <PlusOutlined style={{ marginRight: "10px" }} />
          Add Package Type
        </Button>
      </div>
      <ExportCSV
        csvData={packageTypes.map((item) => {
          return {
            ID: item.packingid,
            Type: item.packingtype,
            Description: item.description,
            Capacity: item.capacity,
            Cap_Color: item.capcolor,
            Cap_Size: item.capsize,
            Cap_Style: item.capstyle,
            Diameter: item.diameter,
            Diptube: item.diptube,
            Label_Panel_Dimension: item.labelpaneldimension,
            Height: item.height,
            Container_Weight: item.containerweight,
            Container_Volume: item.containervolume,
          };
        })}
        fileName="All Package Types"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All Package Types.pdf"
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
      <div
        style={{
          width: "fit-content",
          backgroundColor: "#f4f4fc",
        }}
        ref={ref1}
      >
        <Table
          onEdit={editVendor}
          onDelete={removeVendor}
          data={packageTypes}
          setPdf={pdf}
          ref={ref}
          columns={[
            "packingid",
            "packingtype",
            "description",
            "capacity",
            "capcolor",
            "capsize",
            "capstyle",
            "diameter",
            "diptube",
            "labelpaneldimension",
            "height",
            "containerweight",
            "containervolume",
          ]}
          titles={[
            "ID",
            "Type",
            "Description",
            "Capacity",
            "Cap Color",
            "Cap Size",
            "Cap Style",
            "Diameter",
            "Dip Tube",
            "Label Panel Dimension",
            "Height",
            "Container Weight",
            "Container Volume",
          ]}
        />
      </div>
      <Modal
        visible={open}
        title={PackageTypeId !== "" ? "Edit Package Type" : "Add Package Type"}
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
            label="Packing ID"
            name="packingid"
            rules={[
              {
                required: true,
                message: "Please input Package Type Id!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Packing Type"
            name="packingtype"
            rules={[
              {
                required: true,
                message: "Please input Package Type !",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Packing Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input  Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Packing Capacity" name="capacity">
            <Input />
          </Form.Item>

          <Form.Item label="Packing Cap Color" name="capcolor">
            <Input />
          </Form.Item>

          <Form.Item label="Packing Cap Size" name="capsize">
            <Input />
          </Form.Item>

          <Form.Item label="Packing Cap Style" name="capstyle">
            <Input />
          </Form.Item>

          <Form.Item label="Packing Diameter" name="diameter">
            <InputNumber step="0.1" />
          </Form.Item>

          <Form.Item label="Packing Diptube" name="diptube">
            <InputNumber step="0.1" />
          </Form.Item>

          <Form.Item
            label="Packing Label Panel Dimension"
            name="labelpaneldimension"
          >
            <Input />
          </Form.Item>

          <Form.Item label="Packing Height" name="height">
            <InputNumber step="0.1" />
          </Form.Item>

          <Form.Item label="Packing Container Weight" name="containerweight">
            <InputNumber step="0.1" />
          </Form.Item>

          <Form.Item label="Packing Container Volume" name="containervolume">
            <InputNumber step="0.1" />
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
    packageTypes: state.packageTypeReducer.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(PackageType);
