import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/productCategory";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, Modal } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
const { Option } = Select;

const countries = [
  "Hong Kong",
  "Japan",
  "Republic of Korea",
  "Singapore",
  "Taiwan",
  "Thailand",
  "Andorra",
  "Austria",
  "Belgium",
  "Bulgaria",
  "Cyprus",
  "Czech",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Iceland",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Monaco",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "San Marino",
  "Slovak Republic",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
];

const ProductCategory = ({ categories, get, add, deletee, edit }) => {
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [categoryId, setCategoryId] = useState("");
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
    setProductCategories(categories);
  }, [categories]);
  const onFinish = (values) => {
    setOpen(false);
    setLoading(true);
    console.log(values);
    categoryId === ""
      ? add(values)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
          })
          .catch((err) => {
            setLoading(false);
            cogoToast.error(err);
          })
      : edit(values, categoryId)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
            setCategoryId("");
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

  const removeCategory = (id) => {
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
    setCategoryId("");
  };

  const editCategory = (id) => {
    setCategoryId(id);
    let category = categories.filter((item) => item._id === id)[0];
    form.setFieldsValue({
      categorytitle: category.categorytitle,
      categorydescription: category.catdescription,
      parentid: category.parentid ? category.parentid : 0,
      country: category.blockedcountries,
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
          Add Category
        </Button>
      </div>
      <Table
        onEdit={editCategory}
        onDelete={removeCategory}
        categories={productCategories}
      />
      <Modal
        visible={open}
        title={categoryId !== "" ? "Edit Category" : "Add Category"}
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
            name="categorytitle"
            rules={[
              {
                required: true,
                message: "Please input Category Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categorydescription"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input Description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item initialValue={0} label="Parent Category" name="parentid">
            <Select>
              <Option value={0}>Please Select</Option>
              {categories.map((category) => (
                <Option key={category._id} value={category.categoryid}>
                  {category.categorytitle}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item initialValue={[]} label="Blocked Countries" name="country">
            <Select
              mode="multiple"
              placeholder="Please Select Countries to be Blocked"
              style={{ width: "100%" }}
            >
              {countries.map((country, index) => (
                <Option key={`${country} ${index}`} value={country}>
                  {country}
                </Option>
              ))}
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
    categories: state.productCategoryReducer.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory);
