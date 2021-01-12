import {
  Form,
  Input,
  Button,
  Select,
  Tabs,
  InputNumber,
  Checkbox,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/product";
import "antd/dist/antd.css";
import { Option } from "antd/lib/mentions";
import { Spinner } from "react-bootstrap";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import cogoToast from "cogo-toast";
import "antd/dist/antd.css";
import { BACK_END_URL } from "../../utilities/Axios/url";
import axios from "axios";
const { TabPane } = Tabs;

const ComboForm = ({ match, add, edit, combos, deleteProductImage }) => {
  const [loading, setLoading] = useState(true);
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
  const [products, setProducts] = useState([]);
  const [combo, setCombo] = useState(
    combos.filter((item) => item._id === match.params.id)[0]
  );
  console.log(combo);
  useEffect(() => {
    axios
      .get(`${BACK_END_URL}/products/combos/addCombo`)
      .then((result) => {
        setProducts(result.data.productList);
        setLoading(false);
        if (match.params.type === "edit") {
          editValues(combo, false);
        }
        if (combo) {
          setRecievedGalleryUrls(combo.galleryimgdetails);
        }
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err.message);
      });
  }, []);
  const editValues = (combo, boolean) => {
    console.log(combo);
    form.setFieldsValue({
      producttitle: combo.title,
      sdescription: combo.sdescription,
      description: combo.description,
      select_product_combo: combo.products.map((item) => item.combo_pid),
      hide: combo.visibilitytype === true ? "true" : "false",
      featured: combo.featured === true ? "1" : "0",
      sale_price: combo.dsaleprice,
      barcode: combo.barcode,
      enable_review: combo.enablereview,
      asin: combo.asin,
      use: combo.use,
      storage: combo.storage,
      warning: combo.warning,
      indication: combo.indication,
      direction: combo.direction,
      warranty: combo.warranty,
      sku: combo.sku,
      batch_no: combo.batch_no,
      expiry: combo.expiry,
      volume: combo.volume,
      volume_unit: combo.volumeunit,
      keyingredients: combo.keyingredients,
      allingredients: combo.allingredients,
    });
    combo.attributecontent.map((item, index) =>
      form.setFieldsValue({
        [`page_attribute[${index}][title]`]: item.title,
        [`page_attribute[${index}][description]`]: item.description,
      })
    );
    combo.faqcontent.map((item, index) =>
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
    const selectedProducts = values.select_product_combo;
    for (let i = 0; i < selectedProducts.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (selectedProducts[i] === products[j]._id) {
          formData.append(
            `select_simple__${selectedProducts[i]}`,
            products[j].title
          );
        }
      }
    }
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
    formData.append("reactCombo", "true");
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
            console.log(result);
            setLoading(false);
            cogoToast.success(result.message);
            console.log(result.data);
            editValues(
              {
                ...result.data,
              },
              true
            );
            setCombo({
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
            productid: combo._id,
          };
        } else {
          data = {
            action: "f_remove_combo",
            productid: combo._id,
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
            setCombo({
              ...combo,
              menuimage: formField === "menu_image" ? "" : combo.menuimage,
              featureimage:
                formField === "menu_image" ? combo.featureimage : "",
            });
          })
          .catch((err) => cogoToast.error(err));
      } else {
        data = {
          productid: combo._id,
        };
        deleteProductImage(data, "productMeta")
          .then((result) => {
            setLoading(false);
            setImageType({
              ...imageType,
              [anotherStateField]: true,
            });
            cogoToast.success(result.message);
            setCombo({
              ...combo,
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
      <h3> {`${match.params.type.toUpperCase()} COMBO`} </h3>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridColumnGap: "20px",
          }}
        >
          <Form.Item
            initialValue={[]}
            label="Products"
            name="select_product_combo"
          >
            <Select
              mode="multiple"
              placeholder="Please Select Products"
              style={{ width: "100%" }}
            >
              {products.map((item, index) => (
                <Option key={`${item.title} ${index}`} value={item._id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
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
          <Form.Item initialValue="true" label="Visibility" name="hide">
            <Select>
              <Option value="true">Show</Option>
              <Option value="false">Hide</Option>
            </Select>
          </Form.Item>

          <Form.Item initialValue="0" label="Type Of Product" name="featured">
            <Select>
              <Option value="0">Normal</Option>
              <Option value="1">Featured</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="card-container">
          <Tabs type="card">
            <TabPane forceRender={true} tab="General" key="1">
              <div
                style={{
                  marginTop: "20px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gridColumnGap: "10px",
                }}
              >
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
                  <Form.Item initialValue="cc" label="Unit" name="volume_unit">
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
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 3fr ",
                  gridColumnGap: "10px",
                }}
              ></div>
            </TabPane>
          </Tabs>
        </div>

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridColumnGap: "20px",
          }}
        >
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
            {(imageUrl.menuPreviewUrl !== "" || (combo && combo.menuimage)) && (
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
                      : `${BACK_END_URL}/${combo.menuimage}`.replace(
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
              (combo && combo.featureimage)) && (
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
                      : `${BACK_END_URL}/${combo.featureimage}`.replace(
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
              (combo && combo.sectionbimage)) && (
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
                      : `${BACK_END_URL}/${combo.sectionbimage}`.replace(
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
                          productid: combo._id,
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
                          setCombo({
                            ...combo,
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

        <Form.Item>
          <Button
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="primary"
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
    combos: state.productReducer.combos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    edit: (data, id) => dispatch(actionCreators.editCombo(data, id)),
    add: (data) => dispatch(actionCreators.addCombo(data)),
    deleteProductImage: (data, type) =>
      dispatch(actionCreators.removeComboImage(data, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboForm);
