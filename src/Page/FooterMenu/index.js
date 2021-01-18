import React from "react";
import { useEffect } from "react";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal, Select, Space } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { BACK_END_URL } from "../../utilities/Axios/url";
import { Collapse } from "antd";

const { Panel } = Collapse;

const FooterMenus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState([]);
  const [filters, setFilters] = useState([]);
  const [menuType, setMenuType] = useState("categorypage");
  useEffect(() => {
    axios
      .get(`${BACK_END_URL}/footermenus/getAllFooters`)
      .then((result) => {
        console.log(result);
        setMenus(result.data.newfooters);
        setCategories(result.data.categories);
        setPages(result.data.pages);
        setFilters(result.data.filter);
        setLoading(false);
        cogoToast.success("All Footers Fetched Successfully");
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, []);
  const onFinish = (values) => {
    setOpen(false);
    setLoading(true);
    console.log(values);
    axios
      .post(`${BACK_END_URL}/footermenus/add`, { ...values, reactData: true })
      .then((result) => {
        console.log(result);
        setMenus(result.data.newfooters);
        setCategories(result.data.categories);
        setPages(result.data.pages);
        setFilters(result.data.filter);
        setLoading(false);
        cogoToast.success("Footer Menu Added Successfully");
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

  const edit = (id, data) => {
    setLoading(true);
    axios
      .post(`${BACK_END_URL}/footermenus/edit/${id}`, {
        ...data,
        reactData: true,
      })
      .then((result) => {
        console.log(result);
        setMenus(result.data.newfooters);
        setCategories(result.data.categories);
        setPages(result.data.pages);
        setFilters(result.data.filter);
        setLoading(false);
        cogoToast.success("Footer Menu Edited Successfully");
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  };

  const editFooter = (id, data) => {
    setLoading(true);
    axios
      .post(`${BACK_END_URL}/footermenus/edit/${id}`, {
        ...data,
        reactData: true,
      })
      .then((result) => {
        console.log(result);
        setMenus(result.data.newfooters);
        setCategories(result.data.categories);
        setPages(result.data.pages);
        setFilters(result.data.filter);
        setLoading(false);
        cogoToast.success("Footer Edited Successfully");
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  };

  const deletee = (id) => {
    setLoading(true);
    axios
      .get(`${BACK_END_URL}/footermenus/deleteFooterMenu/${id}`)
      .then((result) => {
        console.log(result);
        setMenus(result.data.newfooters);
        setCategories(result.data.categories);
        setPages(result.data.pages);
        setFilters(result.data.filter);
        setLoading(false);
        cogoToast.success("Footer Menu Deleted Successfully");
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

  const callback = (key) => {
    console.log(key);
  };

  //   const editVendor = (id) => {
  //     setVendorId(id);
  //     let vendor = vendors.filter((item) => item._id === id)[0];
  //     form.setFieldsValue({
  //       vendorname: vendor.vendorname,
  //       vendorid: vendor.vendorid,
  //     });
  //     setOpen(true);
  //   };
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
          Add Footer Menu
        </Button>
      </div>
      {menus && (
        <Collapse
          style={{ backgroundColor: "white" }}
          bordered={false}
          accordion
          onChange={callback}
        >
          {menus.map((menu, index) => (
            <Panel
              style={{
                marginBottom: "30px",
                backgroundColor: "#fafafa",
                border: "none !important",
              }}
              header={`${menu.label}`}
              key={index}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridColumnGap: "20px",
                  marginBottom: "30px",
                  marginTop: "20px",
                  gridRowGap: "20px",
                }}
              >
                <div>
                  <label htmlFor="">Title</label>
                  <Input
                    onChange={(e) => {
                      let currentMenus = [...menus];
                      currentMenus[index].label = e.target.value;
                      setMenus(currentMenus);
                    }}
                    value={menu.label}
                  />
                </div>
                <div>
                  <label htmlFor="">Type</label>
                  <Input readOnly value={menu.type} />
                </div>
                <Button
                  onClick={() => {
                    editFooter(menu.id, {
                      footerlabel: menu.label,
                      footeredit: "yes",
                    });
                  }}
                  style={{ width: "fit-content" }}
                  type="primary"
                >
                  Edit
                </Button>
              </div>
              {menu.child.map((child, index1) => (
                <Collapse
                  style={{
                    backgroundColor: "white",
                    padding: "30px !important",
                  }}
                  bordered={false}
                  accordion
                  defaultActiveKey="1"
                >
                  <Panel
                    style={{
                      marginBottom: "30px",
                      border: "none !important",
                    }}
                    header={`${child.footerlabel}`}
                    key={`${index}_${index1}`}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gridColumnGap: "30px",
                          gridRowGap: "20px",
                        }}
                      >
                        <div>
                          <label>Menu Type</label>
                          <Select
                            name="menutype"
                            value={child.pagetype}
                            placeholder="Please Select Menu Type"
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              let currentMenus = [...menus];
                              currentMenus[index].child[index1].pagetype = e;
                              if (e === "categorypage") {
                                currentMenus[index].child[index1].externallink =
                                  "";
                                currentMenus[index].child[index1].category =
                                  categories[0].categorytitle;
                                currentMenus[index].child[index1].pageid = "";
                              } else if (e === "custompage") {
                                currentMenus[index].child[index1].category = "";
                                currentMenus[index].child[index1].externallink =
                                  "";
                                currentMenus[index].child[index1].pageid =
                                  pages[0]._id;
                              } else {
                                currentMenus[index].child[index1].category = "";
                                currentMenus[index].child[index1].pageid = "";
                              }
                              setMenus(currentMenus);
                            }}
                          >
                            <Select.Option
                              key="Category Page"
                              value="categorypage"
                            >
                              Category Page
                            </Select.Option>
                            <Select.Option key="Custom Page" value="custompage">
                              Custom Page
                            </Select.Option>
                            <Select.Option
                              key="External Link"
                              value="externallink"
                            >
                              External Link
                            </Select.Option>
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="">Title</label>
                          <Input
                            name="footerlabel"
                            required
                            value={child.footerlabel}
                            onChange={(e) => {
                              let currentMenus = [...menus];
                              currentMenus[index].child[index1].footerlabel =
                                e.target.value;
                              setMenus(currentMenus);
                            }}
                          />
                        </div>
                        {child.pagetype === "externallink" && (
                          <div>
                            <label htmlFor="">External URL</label>
                            <Input
                              name="externallink"
                              value={child.externallink}
                              onChange={(e) => {
                                let currentMenus = [...menus];
                                currentMenus[index].child[index1].externallink =
                                  e.target.value;
                                setMenus(currentMenus);
                              }}
                            />
                          </div>
                        )}

                        {child.pagetype === "categorypage" && (
                          <div>
                            <label htmlFor="">Category</label>
                            <Select
                              name="category"
                              value={
                                child.category || categories[0].categorytitle
                              }
                              onChange={(e) => {
                                let currentMenus = [...menus];
                                currentMenus[index].child[index1].category = e;
                                setMenus(currentMenus);
                              }}
                              placeholder="Please Select Category"
                              style={{ width: "100%" }}
                            >
                              {categories.map((category, index3) => (
                                <Select.Option
                                  key={`${category.categorytitle}_${index3}`}
                                  value={category.categorytitle}
                                >
                                  {category.categorytitle}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                        )}

                        {child.pagetype === "custompage" && (
                          <div>
                            <label htmlFor="">Page Title</label>
                            <Select
                              name="pagetitle"
                              onChange={(e) => {
                                let currentMenus = [...menus];
                                currentMenus[index].child[index1].pageid = e;
                                setMenus(currentMenus);
                              }}
                              value={child.pageid || pages[0]._id}
                              placeholder="Please Select Category"
                              style={{ width: "100%" }}
                            >
                              {pages.map((page, index4) => (
                                <Select.Option
                                  key={`${page.title}_${index4}`}
                                  value={page._id}
                                >
                                  {page.title}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                        )}

                        {menus && (
                          <div>
                            <label>Parent Menu</label>
                            <Select
                              name="parentid"
                              value={child.parentid}
                              placeholder="Please Select Parent Menu"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                let currentMenus = [...menus];
                                currentMenus[index].child[index1].parentid = e;
                                setMenus(currentMenus);
                              }}
                            >
                              {menus.map((main, index2) => (
                                <Select.Option
                                  key={`${main.label}_${index2}`}
                                  value={main.id}
                                >
                                  {main.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                        )}
                        <Button
                          onClick={() => {
                            edit(child._id, {
                              footerlabel:
                                menus[index].child[index1].footerlabel,
                              footeruniqueid: menus[index].child[index1]._id,
                              category: menus[index].child[index1].category,
                              pagetype: menus[index].child[index1].pagetype,
                              parentid: menus[index].child[index1].parentid,
                              externallink:
                                menus[index].child[index1].externallink,
                              pagetitle: menus[index].child[index1].pageid,
                            });
                          }}
                          style={{ width: "fit-content" }}
                          type="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deletee(child._id)}
                          style={{ width: "fit-content" }}
                          type="danger"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              ))}
            </Panel>
          ))}
        </Collapse>
      )}
      <Modal
        visible={open}
        title={"Add Footer Menu"}
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
          onFieldsChange={(changedFields) => {
            console.log(changedFields);
            if (
              changedFields.length > 0 &&
              changedFields[0].name[0] === "pagetype"
            ) {
              setMenuType(changedFields[0].value);
              form.setFieldsValue({
                category: "",
                pagetitle: "",
              });
            }
          }}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            initialValue="categorypage"
            label="Footer Type"
            name="pagetype"
          >
            <Select
              placeholder="Please Select Footer Type"
              style={{ width: "100%" }}
            >
              <Select.Option key="Category Page" value="categorypage">
                Category Page
              </Select.Option>
              <Select.Option key="Custom Page" value="custompage">
                Custom Page
              </Select.Option>
              <Select.Option key="External Link" value="externallink">
                External Link
              </Select.Option>
            </Select>
          </Form.Item>
          {menuType === "externallink" && (
            <Form.Item label="External URL" name="externallink">
              <Input />
            </Form.Item>
          )}

          {menuType === "categorypage" && (
            <Form.Item initialValue="" label="Category Name" name="category">
              <Select placeholder="Please Select Category">
                <Select.Option value="">Select Category</Select.Option>
                {categories.map((category, index3) => (
                  <Select.Option
                    key={`${category.categorytitle}_${index3}`}
                    value={category.categorytitle}
                  >
                    {category.categorytitle}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {menuType === "custompage" && (
            <Form.Item initialValue="" label="Page Name" name="pagetitle">
              <Select placeholder="Please Select Page Title">
                <Select.Option value="">Select Page Title</Select.Option>
                {pages.map((page, index4) => (
                  <Select.Option
                    key={`${page.title}_${index4}`}
                    value={page._id}
                  >
                    {page.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item label="Label" name="footerlabel">
            <Input placeholder="Please Enter Footer Menu Label" />
          </Form.Item>

          <Form.Item
            initialValue={filters[0]._id}
            label="Parent Menu"
            name="parentid"
          >
            <Select placeholder="Please Select Parent Menu">
              {filters.map((filter, index4) => (
                <Select.Option
                  key={`${filter.footerlabel}_${index4}`}
                  value={filter._id}
                >
                  {filter.footerlabel}
                </Select.Option>
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

export default FooterMenus;
