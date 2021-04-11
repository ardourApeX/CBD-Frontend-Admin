import {
  Form,
  Input,
  Button,
  Select,
  Tabs,
  InputNumber,
  Checkbox,
  Upload,
  Collapse,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../page.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/product";
import * as vendorActionCreators from "../../store/actions/vendor";
import * as categoryActionCreators from "../../store/actions/productCategory";
import * as packageActionCreators from "../../store/actions/packageType";
import "antd/dist/antd.css";
import { Option } from "antd/lib/mentions";
import { Spinner } from "react-bootstrap";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/chrome";
import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import cogoToast from "cogo-toast";
import "antd/dist/antd.css";
import { BACK_END_URL } from "../../utilities/Axios/url";
import { cloneDeep } from "lodash";
const { TabPane } = Tabs;

const { Panel } = Collapse;

const ProductForm = ({
  match,
  add,
  edit,
  vendors,
  categories,
  packages,
  getVendors,
  getCategories,
  getPackages,
  products,
  deleteProductImage,
}) => {
  const [loading, setLoading] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [form] = Form.useForm();
  const [recievedGalleryUrls, setRecievedGalleryUrls] = useState([]);
  const [image, setImage] = useState({
    menuImage: null,
    sectionaImage: null,
    sectionbImage: null,
    galleryImage: [],
  });
  const [imageUrl, setImageUrl] = useState({
    menuPreviewUrl: "",
    sectionaPreviewUrl: "",
    sectionbPreviewUrl: "",
    galleryPreviewUrl: [],
  });
  const [imageType, setImageType] = useState({
    menuImage: false,
    sectionaImage: false,
    sectionbImage: false,
    galleryImage: false,
  });
  const [product, setProduct] = useState(
    products.filter((item) => item._id === match.params.id)[0]
  );
  const [normal, setNormal] = useState(
    product ? (product.featured === true ? "1" : "0") : "0"
  );

  console.log(product);
  useEffect(() => {
    getVendors().then(() => {
      getCategories().then(() => {
        getPackages().then(() => {
          setLoading(false);
          if (match.params.type === "edit") {
            setAttributes(
              product.attributes.length ? product.attributesList : []
            );
            editValues(product, false);
          }
          if (product) {
            setRecievedGalleryUrls(product.galleryimgdetails);
          }
        });
      });
    });
  }, []);
  const editValues = (product, boolean) => {

    form.setFieldsValue({
      producttitle: product.productid.producttitle,
      sdescription: product.productid.sdescription,
      description: product.productid.description,
      producttype: product.producttype,
      vendorid: product.vendorid,
      packagingtype: product.packagingtype,
      hide: product.visibilitytype === true ? "true" : "false",
      featured: product.featured === true ? "1" : "0",
      regular_price: product.dregularprice,
      sale_price: product.dsaleprice,
      barcode: product.barcode,
      enable_review: product.enablereview,
      totalcbdmg: product.totalcbdmg,
      cbdperunitmg: product.cbdperunitmg,
      servings: product.servings,
      servingsize: product.servingsize,
      fieldname: product.fieldname,
      fieldvalue: product.fieldvalue,
      asin: product.asin,
      use: product.use,
      storage: product.storage,
      warning: product.warning,
      indication: product.indication,
      direction: product.direction,
      warranty: product.warranty,
      categoryid: boolean
        ? product.categoryid
        : product.categoryid.map((item) => item._id),
      sku: product.productid.sku,
      manage_stock: product.managestockstatus,
      batch_no: product.batch_no,
      expiry: product.expiry,
      _length: product.shipping_length,
      _height: product.shipping_height,
      _width: product.shipping_width,
      volume: product.volume,
      volume_unit: product.volumeunit,
      weight: product.weight,
      keyingredients: product.keyingredients,
      allingredients: product.allingredients,
      productid: product.productid.id,
      html:product.html ? product.html :"",
      html1:product.html1 ? product.html1 :"",

    });
    product.attributecontent &&
      product.attributecontent.map((item, index) =>
        form.setFieldsValue({
          [`page_attribute[${index}][title]`]: item.title,
          [`page_attribute[${index}][description]`]: item.description,
        })
      );
    product.faqcontent &&
      product.faqcontent.map((item, index) =>
        form.setFieldsValue({
          [`faq[${index}][title]`]: item.title,
          [`faq[${index}][description]`]: item.description,
        })
      );
  };
  const onFinish = (values) => {
    const { menuImage, sectionaImage, sectionbImage, galleryImage } = image;
    setLoading(true);
    const formData = new FormData();
    console.log(values);
    Object.keys(values)
      .filter(
        (item) =>
          item !== "menu_image" ||
          item !== "feature_image" ||
          item !== "product_gallery_image" ||
          item !== "sectionbimage" ||
          item !== "labsheet"
      )
      .forEach((key) => {
        if (values[key] || typeof values[key] === "boolean") {
          formData.append(key, values[key]);
        }
      });
    if (menuImage) {
      formData.append("menu_image", menuImage);
    }
    if (sectionaImage) {
      formData.append("feature_image", sectionaImage);
    }
    if (galleryImage.length > 0) {
      galleryImage.map((item, index) =>
        formData.append(`product_gallery_image_${index}`, item)
      );
    }
    if (sectionbImage) {
      formData.append("sectionbimage", sectionbImage);
    }
    if (values.labsheet) {
      formData.append("labsheet", values.labsheet.fileList[0].originFileObj);
    }
    formData.append("attributes", JSON.stringify(attributes));
    match.params.type === "add"
      ? add(formData)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result);
            form.resetFields();
            clearOut();
          })
          .catch((err) => {
            setLoading(false);
            cogoToast.error(err);
            form.resetFields();
            clearOut();
          })
      : edit(formData, match.params.id)
          .then((result) => {
            setLoading(false);
            cogoToast.success(result.message);
            console.log(result.data);
            setAttributes(result.data.attributesList);
            editValues(
              {
                ...result.data,
                productid: result.product,
              },
              true
            );
            setProduct({
              ...result.data,
              productid: result.product,
            });
          })
          .catch((err) => {
            setLoading(false);
            cogoToast.error(err);
          });
  };
  const clearOut = () => {
    setImageUrl({
      menuPreviewUrl: "",
      sectionaPreviewUrl: "",
      sectionbPreviewUrl: "",
      galleryPreviewUrl: [],
    });
    setImage({
      menuImage: null,
      sectionaImage: null,
      sectionbImage: null,
      galleryImage: [],
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    form.resetFields();
  };
  const handleImageDelete = (
    formField,
    stateField,
    anotherStateField,
    type
  ) => {
    if (match.params.type === "add" || imageType[anotherStateField]) {
      setImageUrl({
        ...imageUrl,
        [stateField]: "",
      });
      setImage({
        ...image,
        [anotherStateField]: null,
      });
      form.resetFields([formField]);
    } else {
      setLoading(true);
      let data;
      if (type === "product") {
        if (formField === "menu_image") {
          data = {
            action: "menu_remove",
            productid: product.productid._id,
          };
        } else {
          data = {
            action: "f_remove",
            productid: product.productid._id,
          };
        }
        deleteProductImage(data, "product")
          .then((result) => {
            setLoading(false);
            setImageType({
              ...imageType,
              [anotherStateField]: true,
            });
            cogoToast.success(result.message);
            setProduct({
              ...product,
              productid: result.data,
            });
          })
          .catch((err) => cogoToast.error(err));
      } else {
        data = {
          productid: product._id,
        };
        deleteProductImage(data, "productMeta")
          .then((result) => {
            setLoading(false);
            setImageType({
              ...imageType,
              [anotherStateField]: true,
            });
            cogoToast.success(result.message);
            setProduct({
              ...product,
              sectionbimage: "",
            });
          })
          .catch((err) => cogoToast.error(err));
      }
    }
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
      <h3 style={{ marginBottom: "30px" }}>
        {`${match.params.type.toUpperCase()} PRODUCT`}
      </h3>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Tabs defaultActiveKey="1">
          <TabPane forceRender={true} tab="General Information" key="1">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gridColumnGap: "20px",
              }}
            >
              {match.params.type === "edit" ? (
                <Form.Item
                  label="Serial Number"
                  name="productid"
                  rules={[
                    {
                      required: true,
                      message: "Please input Product ID",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              ) : null}
              <Form.Item
                label="Title"
                name="producttitle"
                rules={[
                  {
                    required: true,
                    message: "Please input Product Title",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridColumnGap: "20px",
              }}
            >
              <Form.Item label="Short Description" name="sdescription">
                <TextArea aria-colspan="3" />
              </Form.Item>

              <Form.Item label="Long Description" name="description">
                <TextArea />
              </Form.Item>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                gridColumnGap: "20px",
              }}
            >
              <Form.Item
                initialValue="simple"
                label="Product Data"
                name="producttype"
                rules={[
                  {
                    required: true,
                    message: "Please Select Product Type",
                  },
                ]}
              >
                <Select>
                  <Option value="simple">Simple Product</Option>
                  <Option value="variable">Variable Product</Option>
                </Select>
              </Form.Item>

              <Form.Item
                initialValue={vendors[0]._id}
                label="Vendor ID"
                name="vendorid"
                rules={[
                  {
                    required: true,
                    message: "Please Select vendor",
                  },
                ]}
              >
                <Select>
                  {vendors.map((vendor) => (
                    <Option key={vendor._id} value={vendor._id}>
                      {vendor.vendorid}: {vendor.vendorname}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                initialValue={packages[0]._id}
                label="Packaging Type"
                name="packagingtype"
                rules={[
                  {
                    required: true,
                    message: "Please Select Packaging Type",
                  },
                ]}
              >
                <Select>
                  {packages.map((packageType) => (
                    <Option key={packageType._id} value={packageType._id}>
                      {packageType.packingid}: {packageType.packingtype}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                gridColumnGap: "20px",
              }}
            >
              <Form.Item
                initialValue="true"
                label="Visibility"
                name="hide"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Product Visibility",
                  },
                ]}
              >
                <Select>
                  <Option value="true">Show</Option>
                  <Option value="false">Hide</Option>
                </Select>
              </Form.Item>

              <Form.Item
                initialValue="0"
                label="Type Of Product"
                name="featured"
              >
                <Select onChange={(e) => setNormal(e)}>
                  <Option value="0">Normal</Option>
                  <Option value="1">Featured</Option>
                </Select>
              </Form.Item>
             
            
             
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gridColumnGap: "20px",              }}
            >
               <Form.Item
              initialValue=""
              label="Details: this details add HTML code to the details section of the product"
              name="html">
            <AceEditor
              onChange={(code) => {
                document.getElementsByClassName("preview")[0].innerHTML = code;
                }}
                value={product.html}
            mode="javascript"
            theme="chrome"
            style={{ width: "100%", height: "100px" }}
            setOptions={{
              fontSize: 20,
            }}
          />
                    <br/>
                    <div 
            className="preview" 
            style={{
                    padding:"20px",
                    border:"none",
                    marginTop: "20px",
                    borderRadius: "5px",
                    display: "none",
                    backgroundColor:"lightgray",
                    width:"100%",
                    height:"100px",
                    resize: "both",
                    overflow: "auto"
                  }}>
            </div>
          </Form.Item>
          <Form.Item
              initialValue=""
              label="FAQ : This HTML data gets displayed on the FAQ section of a product"
              name="html1">
            <AceEditor
               onChange={(code) => {
                document.getElementsByClassName("preview")[1].innerHTML = code;
                }}
            mode="javascript"
            theme="chrome"
            value={product.html1}
            style={{ width: "100%", height: "100px" }}
            setOptions={{
              fontSize: 20,
            }}

          />
                      <div 
            className="preview" 
            style={{border:"none",
                    padding:"20px",
                    marginTop: "20px",
                    display: "none",
                    borderRadius: "5px",
                    backgroundColor:"lightgray",
                    width:"100%",
                    height:"100px",
                    resize: "both",
                    overflow: "auto"
                  }}>
            </div>


          </Form.Item>
              </div>
          </TabPane>
          <TabPane
            forceRender={true}
            tab="Price, Inventory and Shipping Information"
            key="2"
          >
            <div className="card-container">
              <Tabs>
                <TabPane forceRender={true} tab="General" key="1">
                  <div
                    style={{
                      marginTop: "20px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                      gridColumnGap: "10px",
                    }}
                  >
                    <Form.Item
                      label="Default Regular Price ($)"
                      name="regular_price"
                      rules={[
                        {
                          required: true,
                          message: "Please input Package Type Id!",
                        },
                      ]}
                    >
                      <InputNumber step="0.1" />
                    </Form.Item>
                    <Form.Item
                      label="Default Sale Price ($)"
                      name="sale_price"
                      rules={[
                        {
                          required: true,
                          message: "Please input Package Type Id!",
                        },
                      ]}
                    >
                      <InputNumber step="0.1" />
                    </Form.Item>
                    <Form.Item label="Barcode" name="barcode">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                      valuePropName="checked"
                      initialValue={false}
                      label="Enable reviews"
                      name="enable_review"
                    >
                      <Checkbox />
                    </Form.Item>
                    <Form.Item label="Total CBD (mg)" name="totalcbdmg">
                      <InputNumber step="0.1" />
                    </Form.Item>
                    <Form.Item label="CBD per unit mg" name="cbdperunitmg">
                      <InputNumber step="0.1" />
                    </Form.Item>
                    <Form.Item label="Servings" name="servings">
                      <InputNumber step="0.1" />
                    </Form.Item>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gridColumnGap: "20px",
                    }}
                  >
                    <Form.Item label="Serving Size" name="servingsize">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Field Name" name="fieldname">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Field Value" name="fieldvalue">
                      <Input />
                    </Form.Item>
                  </div>
                </TabPane>
                <TabPane forceRender={true} tab="Inventory" key="2">
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Sku is required",
                        },
                      ]}
                      label="SKU"
                      name="sku"
                    >
                      <Input style={{ width: "30%" }} />
                    </Form.Item>
                    <Form.Item
                      valuePropName="checked"
                      initialValue={true}
                      label="Manage Stock?"
                      name="manage_stock"
                    >
                      <Checkbox />
                    </Form.Item>
                  </div>
                </TabPane>
                <TabPane forceRender={true} tab="Shipping" key="3">
                  <div
                    style={{
                      marginTop: "20px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 2fr",
                      gridColumnGap: "20px",
                    }}
                  >
                    <Form.Item label="Batch No." name="batch_no">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item label="Expiry" name="expiry">
                      <Input placeholder="dd/mm/yyyy" />
                    </Form.Item>
                    <Form.Item label="Dimensions (Inches)">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gridColumnGap: "10px",
                        }}
                      >
                        <Form.Item name="_length">
                          <InputNumber placeholder="length" />
                        </Form.Item>
                        <Form.Item name="_width">
                          <InputNumber placeholder="width" />
                        </Form.Item>
                        <Form.Item name="_height">
                          <InputNumber placeholder="height" />
                        </Form.Item>
                      </div>
                    </Form.Item>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 3fr ",
                      gridColumnGap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Form.Item
                        style={{ marginRight: "20px" }}
                        name="volume"
                        label="Volume"
                      >
                        <InputNumber placeholder="length" />
                      </Form.Item>
                      <Form.Item
                        initialValue="cc"
                        label="Unit"
                        name="volume_unit"
                      >
                        <Select>
                          <Option value="cc">cc</Option>
                          <Option value="ml">ml</Option>
                          <Option value="softgel">softgel</Option>
                          <Option value="capsule">capsule</Option>
                          <Option value="oz">oz</Option>
                          <Option value="lb">lb</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <Form.Item name="weight" label="Weight (oz)">
                      <InputNumber />
                    </Form.Item>
                  </div>
                </TabPane>
                <TabPane forceRender={true} tab="Attributes" key="4">
                  <Button
                    style={{
                      marginLeft: "auto",
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={() => {
                      let current = cloneDeep(attributes);
                      current.push({
                        title: `Attribute ${current.length + 1}`,
                        content: [],
                      });
                      setAttributes(current);
                    }}
                  >
                    <PlusOutlined style={{ marginRight: "10px" }} />
                    Add Attribute
                  </Button>
                  <Collapse accordion>
                    {attributes && attributes.map((item, index) => (
                      <Panel header={item.title} key={item.index}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label>Title</label>
                          <Input
                            style={{ width: "25%" }}
                            value={item.title}
                            onChange={(e) => {
                              let current = cloneDeep(attributes);
                              current[index].title = e.target.value;
                              setAttributes(current);
                            }}
                          />
                        </div>
                        <Button
                          style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                            marginLeft: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "black",
                            color: "white",
                          }}
                          onClick={() => {
                            let current = cloneDeep(attributes);
                            console.log(current);
                            current[index].content.push({
                              title: "",
                              value: "",
                            });
                            setAttributes(current);
                          }}
                        >
                          <PlusOutlined style={{ marginRight: "10px" }} />
                          Add Sub Attribute
                        </Button>
                        {item.content.map((item1, index1) => (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 3fr 1fr",
                              gridColumnGap: "30px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <label>Key</label>
                              <Input
                                value={item1.title}
                                onChange={(e) => {
                                  let current = cloneDeep(attributes);
                                  current[index].content[index1].title =
                                    e.target.value;
                                  setAttributes(current);
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <label>Value</label>
                              <Input
                                value={item1.value}
                                onChange={(e) => {
                                  let current = cloneDeep(attributes);
                                  current[index].content[index1].value =
                                    e.target.value;
                                  setAttributes(current);
                                }}
                              />
                            </div>
                            <div style={{ position: "relative" }}>
                              <Button
                                type="danger"
                                style={{
                                  color: "white",
                                  position: "absolute",
                                  bottom: "0",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  let current = cloneDeep(attributes);
                                  current[index].content.splice(index1, 1);
                                  setAttributes(current);
                                }}
                                icon={<DeleteOutlined />}
                              />
                            </div>
                          </div>
                        ))}
                      </Panel>
                    ))}
                  </Collapse>
                </TabPane>
                <TabPane forceRender={true} tab="Variations" key="5"></TabPane>
              </Tabs>
            </div>
          </TabPane>
          <TabPane
            forceRender={true}
            tab="Direction of Use and Warranty Information"
            key="3"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gridColumnGap: "10px",
                marginTop: "30px",
              }}
            >
              <Form.Item label="ASIN" name="asin">
                <Input />
              </Form.Item>
              <Form.Item label="Use" name="use">
                <Input />
              </Form.Item>
              <Form.Item label="Storage" name="storage">
                <Input />
              </Form.Item>
              <Form.Item label="Warning" name="warning">
                <Input />
              </Form.Item>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridColumnGap: "10px",
              }}
            >
              <Form.Item label="Indication" name="indication">
                <Input />
              </Form.Item>
              <Form.Item label="Direction" name="direction">
                <Input />
              </Form.Item>
              <Form.Item label="Warranty" name="warranty">
                <Input />
              </Form.Item>
            </div>
          </TabPane>
          <TabPane
            forceRender={true}
            tab="Attributes, Ingredients and FAQ's"
            key="4"
          >
            <div>
              {["", "", "", "", ""].map((_, index) => (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    gridColumnGap: "20px",
                  }}
                >
                  <Form.Item
                    label={`Attribute ${index + 1} Title`}
                    name={`page_attribute[${index}][title]`}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={`Attribute ${index + 1} Description`}
                    name={`page_attribute[${index}][description]`}
                  >
                    <TextArea />
                  </Form.Item>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridColumnGap: "20px",
              }}
            >
              <Form.Item label="Key Ingredients" name="keyingredients">
                <TextArea />
              </Form.Item>

              <Form.Item label="All Ingredients" name="allingredients">
                <TextArea />
              </Form.Item>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gridColumnGap: "20px",
              }}
            >
              <Form.Item label={`FAQ Title`} name={`faq[0][title]`}>
                <Input />
              </Form.Item>

              <Form.Item label={`FAQ Description`} name={`faq[0][description]`}>
                <TextArea />
              </Form.Item>
            </div>
          </TabPane>
          <TabPane forceRender={true} tab="Product Category and Images" key="5">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gridColumnGap: "20px",
              }}
            >
              <Form.Item
                label="Product Category"
                name="categoryid"
                rules={[
                  {
                    required: true,
                    message: "Please Select Product Category",
                  },
                ]}
              >
                <Select mode="multiple">
                  {categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.categorytitle}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Labsheet" name="labsheet">
                <Upload multiple={false}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridColumnGap: "20px",
                gridRowGap: "30px",
              }}
            >
              <Form.Item label="Menu Image" name="menu_image">
                <div style={{ display: "flex" }}>
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                      setImage({
                        ...image,
                        menuImage: file,
                      });
                      let reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setImageUrl({
                          ...imageUrl,
                          menuPreviewUrl: reader.result,
                        });
                      };
                      return false;
                    }}
                    multiple={false}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </div>
                {(imageUrl.menuPreviewUrl !== "" ||
                  (product && product.productid.menuimage)) && (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "30px",
                    }}
                  >
                    <img
                      src={
                        imageUrl.menuPreviewUrl !== ""
                          ? imageUrl.menuPreviewUrl
                          : `${BACK_END_URL}/${product.productid.menuimage}`.replace(
                              "/public",
                              ""
                            )
                      }
                      alt="Product"
                      style={{
                        objectFit: "contain",
                        width: "200px",
                        height: "200px",
                        marginTop: "20px",
                        marginRight: "25px",
                      }}
                    />
                    <CloseOutlined
                      onClick={() =>
                        handleImageDelete(
                          "menu_image",
                          "menuPreviewUrl",
                          "menuImage",
                          "product"
                        )
                      }
                    />
                  </div>
                )}
              </Form.Item>
              <Form.Item label="Section A Image" name="feature_image">
                <div style={{ display: "flex" }}>
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                      setImage({
                        ...image,
                        sectionaImage: file,
                      });
                      let reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setImageUrl({
                          ...imageUrl,
                          sectionaPreviewUrl: reader.result,
                        });
                      };
                      return false;
                    }}
                    multiple={false}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </div>
                {(imageUrl.sectionaPreviewUrl !== "" ||
                  (product && product.productid.featurefilepath)) && (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "30px",
                    }}
                  >
                    <img
                      src={
                        imageUrl.sectionaPreviewUrl !== ""
                          ? imageUrl.sectionaPreviewUrl
                          : `${BACK_END_URL}/${product.productid.featurefilepath}`.replace(
                              "/public",
                              ""
                            )
                      }
                      alt="Product"
                      style={{
                        objectFit: "contain",
                        width: "200px",
                        height: "200px",
                        marginTop: "20px",
                        marginRight: "25px",
                      }}
                    />
                    <CloseOutlined
                      onClick={() =>
                        handleImageDelete(
                          "feature_image",
                          "sectionaPreviewUrl",
                          "sectionaImage",
                          "product"
                        )
                      }
                    />
                  </div>
                )}
              </Form.Item>
              <Form.Item label="Section B Image" name="sectionbimage">
                <div style={{ display: "flex" }}>
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                      setImage({
                        ...image,
                        sectionbImage: file,
                      });
                      let reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setImageUrl({
                          ...imageUrl,
                          sectionbPreviewUrl: reader.result,
                        });
                      };
                      return false;
                    }}
                    multiple={false}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </div>
                {(imageUrl.sectionbPreviewUrl !== "" ||
                  (product && product.sectionbimage)) && (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "30px",
                    }}
                  >
                    <img
                      src={
                        imageUrl.sectionbPreviewUrl !== ""
                          ? imageUrl.sectionbPreviewUrl
                          : `${BACK_END_URL}/${product.sectionbimage}`.replace(
                              "/public",
                              ""
                            )
                      }
                      alt="Product"
                      style={{
                        objectFit: "contain",
                        width: "200px",
                        height: "200px",
                        marginTop: "20px",
                        marginRight: "25px",
                      }}
                    />
                    <CloseOutlined
                      onClick={() =>
                        handleImageDelete(
                          "sectionbimage",
                          "sectionbPreviewUrl",
                          "sectionbImage",
                          "productMeta"
                        )
                      }
                    />
                  </div>
                )}
              </Form.Item>
            </div>
            <Form.Item label="Product Gallery" name="product_gallery_image">
              <div style={{ display: "flex" }}>
                <Upload
                  showUploadList={false}
                  beforeUpload={(file, fileList) => {
                    let galleryImage = [...image.galleryImage];
                    galleryImage.push(file);
                    setImage({
                      ...image,
                      galleryImage,
                    });
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      let galleryUrls = [...imageUrl.galleryPreviewUrl];
                      galleryUrls.push(reader.result);
                      setImageUrl({
                        ...imageUrl,
                        galleryPreviewUrl: galleryUrls,
                      });
                    };
                    return false;
                  }}
                  multiple={false}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
              {(imageUrl.galleryPreviewUrl.length > 0 ||
                recievedGalleryUrls.length > 0) && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridColumnGap: "30px",
                  }}
                >
                  {recievedGalleryUrls.map((item, index) => (
                    <div
                      style={{
                        display: "flex",
                        marginTop: "30px",
                      }}
                    >
                      <img
                        src={`${BACK_END_URL}/${item}`.replace("/public", "")}
                        alt="Product"
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "200px",
                          marginTop: "20px",
                          marginRight: "25px",
                        }}
                      />
                      <CloseOutlined
                        onClick={() => {
                          setLoading(true);
                          deleteProductImage(
                            {
                              productid: product._id,
                              imagetoremove: index,
                              action: "",
                            },
                            "product"
                          )
                            .then((result) => {
                              setLoading(false);
                              let imageUrls = [...recievedGalleryUrls];
                              imageUrls.splice(index, 1);
                              setRecievedGalleryUrls(imageUrls);
                              cogoToast.success(result.message);
                              setProduct({
                                ...product,
                                galleryimgdetails: result.galleryimgdetails,
                              });
                            })
                            .catch((err) => cogoToast.error(err));
                        }}
                      />
                    </div>
                  ))}
                  {imageUrl.galleryPreviewUrl.map((item, index) => (
                    <div
                      style={{
                        display: "flex",
                        marginTop: "30px",
                      }}
                    >
                      <img
                        src={item}
                        alt="Product"
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "200px",
                          marginTop: "20px",
                          marginRight: "25px",
                        }}
                      />
                      <CloseOutlined
                        onClick={() => {
                          console.log(index);
                          let imageUrls = [...imageUrl.galleryPreviewUrl];
                          imageUrls.splice(index, 1);
                          let images = [...image.galleryImage];
                          images.splice(index, 1);
                          setImageUrl({
                            ...imageUrl,
                            galleryPreviewUrl: imageUrls,
                          });
                          setImage({
                            ...image,
                            galleryImage: images,
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Form.Item>
          </TabPane>
        </Tabs>

        {/* <Collapse
          style={{ backgroundColor: "#f4f4fc", border: "none" }}
          accordion
        >
          <Panel
            style={{
              marginBottom: "30px",
              border: "none !important",
            }}
            header="General Information"
            key="1"
          ></Panel>
          <Panel
            style={{
              marginBottom: "30px",
              border: "none !important",
            }}
            header="Price, Inventory and Shipping Information"
            key="2"
          >
            
          </Panel>
          <Panel
            style={{
              marginBottom: "30px",
              border: "none !important",
            }}
            header="Direction of Use and Warranty Information"
            key="3"
          >
            
          </Panel>
          <Panel
            style={{
              marginBottom: "30px",
              border: "none !important",
            }}
            header="Attributes, Ingredients and FAQ's"
            key="4"
          >
            
          </Panel>
          <Panel
            style={{
              marginBottom: "30px",
              border: "none !important",
            }}
            header="Product Category and Images"
            key="5"
          >
            
          </Panel>
        </Collapse> */}

        <Form.Item>
          <Button
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              color: "white",
              borderRadius: "5px",
            }}
            htmlType="submit"
          >
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    vendors: state.vendorReducer.data,
    categories: state.productCategoryReducer.data,
    packages: state.packageTypeReducer.data,
    products: state.productReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    edit: (data, id) => dispatch(actionCreators.editProduct(data, id)),
    add: (data, attributes) =>
      dispatch(actionCreators.addProduct(data, attributes)),
    getVendors: () => dispatch(vendorActionCreators.get()),
    getCategories: () => dispatch(categoryActionCreators.get()),
    getPackages: () => dispatch(packageActionCreators.get()),
    deleteProductImage: (data, type) =>
      dispatch(actionCreators.removeProductImage(data, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
