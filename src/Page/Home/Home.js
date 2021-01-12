import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import { Card, Button, Spinner, Form, Modal } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import TextForm from "../../App/components/TextForm";
import ImageForm from "../../App/components/ImageForm";
import * as actionCreators from "../../store/actions/home";
import cogoToast from "cogo-toast";
import AceEditor from "react-ace";
import FileBase from "react-file-base64";
import "antd/dist/antd.css";
import { Collapse } from "antd";
const { Panel } = Collapse;
const Heading = [
  "Banner",
  "Logo",
  "Category Slider",
  "Second Section",
  "Third Section",
  "Fourth Section",
];
const SubHeading = [
  ["Title", "Content", "Button Text"],
  ,
  ["Title", "Button Text"],
  ["Title", "Sub Title"],
  ["Title", "Sub Title", "Content", "Button Text"],
  ["Title", "Content"],
];
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        logo: {
          images: [
            {
              src: "",
              name: "",
            },
            {
              src: "",
              name: "",
            },
            {
              src: "",
              name: "",
            },
          ],
        },
        banner: [
          {
            title: "",
            content: "",
            btnText: "",
            hide: false,
            images: {
              name: "",
              src: "",
            },
          },
        ],
        categorySlider: {
          title: "",
          btnText: "",
          hide: false,
          images: [],
        },
        secondSection: {
          title: "",
          bigTitle: "",
          hide: false,
          images: [],
        },
        thirdSection: {
          bigTitle: "",
          title: "",
          content: "",
          btnText: "",
          hide: false,
          images: [
            {
              src: "",
              name: "",
            },
          ],
        },
        fourthSection: {
          title: "",
          content: "",
          hide: false,
          images: [],
        },
      },
      isOpen: false,
      loading: true,
      file: "",
      imageName: "",
      imagePreviewUrl: "",
      formData: {
        title: "",
        content: "",
        btnText: "",
        hide: false,
      },
      logo: [
        { image: "", file: "", imageName: "" },
        { image: "", file: "", imageName: "" },
        { image: "", file: "", imageName: "" },
      ],
      banner: [],
      thirdSection: [{ image: "", file: "", imageName: "" }],
      secondSection: [{ image: "", file: "", imageName: "" }],
      fourthSection: [{ image: "", file: "", imageName: "" }],
    };

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e, index, mainIndex, section) {
    let reader = new FileReader();
    let file = e.target.files[0];
    let currentData, imageData;
    reader.onloadend = () => {
      imageData = [...this.state[section]];
      if (section === "banner") {
        currentData = [...this.state.data[section]];
        currentData[mainIndex].images = {
          name: file.name,
          src: reader.result,
        };
        imageData[mainIndex].file = file;
        imageData[mainIndex].image = reader.result;
      } else {
        console.log(file);
        currentData = { ...this.state.data[section] };
        if (section === "logo") {
          currentData.images[index].src = reader.result;
        } else {
          currentData.images[index] = {
            name: file.name,
            src: reader.result,
          };
        }
        imageData[index].file = file;
        imageData[index].image = reader.result;
      }
      this.setState({
        data: {
          ...this.state.data,
          [section]: currentData,
        },
        [section]: imageData,
        file,
      });
    };

    reader.readAsDataURL(file);
  }

  imageSubmitHandler = (e, section, index, mainIndex) => {
    console.log("Image upload", section, index, this.state.file);

    let formData = new FormData();
    e.preventDefault();
    if (
      (section !== "banner" &&
        this.state.data[section].images[index].src.length > 0) ||
      this.state.data[section][mainIndex].images.src.length > 0
    ) {
      if (section === "banner") {
        formData.append(
          "imageName",
          this.state.data[section][mainIndex].images.name
        );
      } else {
        formData.append(
          "imageName",
          this.state.data[section].images[index].name
        );
      }

      formData.append("section", section);
      formData.append("index", index);
      formData.append("mainIndex", mainIndex);
      formData.append("image", this.state.file);
      this.setState({ loading: true });
      this.props
        .uploadImage(formData, section)
        .then((result) => {
          cogoToast.success(result);
          let imageData = [...this.state[section]];
          if (section === "banner") {
            imageData[mainIndex].file = "";
            imageData[mainIndex].image = "";
          } else {
            imageData[index].file = "";
            imageData[index].image = "";
          }
          this.setState({
            imageName: "",
            file: "",
            imagePreviewUrl: "",
            [section]: imageData,
            loading: false,
          });
          window.location.reload();
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
          cogoToast.error(err);
        });
    } else {
      cogoToast.info("Please select an image");
    }
  };

  optionChange = (e) => {
    this.setState({
      imageName: e.target.value,
    });
    console.log("option change", e.target.name, e.target.value);
  };

  changeHandler = (name, section, data, index) => {
    console.log(name, section, data);
    let curValue = this.state.data[section];
    if (index || index === 0) {
      // console.log("reached here");
      curValue[index][name] = data;
    } else {
      // console.log("reached here 1");
      curValue[name] = data;
    }
    this.setState({
      section: curValue,
    });
    if (name === "hide") {
      this.props
        .update(curValue, section)
        .then((result) => {
          cogoToast.success(result);
        })
        .catch((err) => cogoToast.error(err));
    }
    // console.log("change", event.target, section);
  };
  updateHandler = (event, section) => {
    // console.log("updateHandler", section);
    this.setState({ loading: true });
    event.preventDefault();
    this.props
      .update(this.state.data[section], section)
      .then((result) => {
        this.setState({ loading: false });
        cogoToast.success(result);
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
      });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.data.banner &&
      prevProps.data.banner.length !== this.props.data.banner.length
    ) {
      console.log("Updated");
      let answer = this.createData();
      this.setState({
        data: answer.data,
        banner: answer.newArray,
      });
    }
  };

  createData = () => {
    return {
      newArray: new Array(this.props.data.banner.length).fill({
        image: "",
        file: "",
        imageName: "",
      }),
      data: {
        logo: {
          ...this.props.data.logo,
        },
        banner: [...this.props.data.banner],
        categorySlider: {
          ...this.props.data.categorySlider,
        },
        secondSection: {
          ...this.props.data.secondSection,
        },
        thirdSection: {
          ...this.props.data.thirdSection,
        },
        fourthSection: {
          ...this.props.data.fourthSection,
        },
      },
    };
  };

  componentDidMount = () => {
    this.props
      .get()
      .then((result) => {
        let answer = this.createData();
        this.setState({
          loading: false,
          data: answer.data,
          banner: answer.newArray,
        });
        cogoToast.success(result);
      })
      .catch((err) => {
        cogoToast.error(err);
      });
  };
  cardChange = (card) => {};
  closeModal = () => {
    this.setState({
      isOpen: false,
      formData: {
        title: "",
        content: "",
        btntext: "",
        hide: false,
        images: [],
      },
    });
  };

  submitModal = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(this.state.formData).forEach((key) =>
      formData.append(key, this.state.formData[key])
    );
    formData.append("image", this.state.file);
    formData.append("addBanner", true);
    this.setState({
      loading: true,
      isOpen: false,
      formData: {
        title: "",
        content: "",
        btntext: "",
        hide: false,
      },
    });
    this.props
      .uploadImage(formData, "banner")
      .then((result) => {
        this.setState({ loading: false });
        cogoToast.success(result);
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
      });
  };

  callback = (key) => console.log(key);

  deleteBanner = (e, section, index) => {
    e.preventDefault();
    let currentData = [...this.state.data.banner];
    currentData.splice(index, 1);
    this.setState({ loading: true });
    this.props
      .update(currentData, "banner")
      .then((result) => {
        this.setState({ loading: false });
        cogoToast.success(result);
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
      });
  };

  render() {
    console.log(this.props.data);
    let data = Object.keys(this.props.data || {}).map((elem, index) => {
      let element = { ...this.state.data[elem] };
      element[0] ? console.log("") : delete element.hide;
      delete element.images;
      let newSubheadings = Object.keys(element).map(
        (elem) => elem[0].toUpperCase() + elem.substring(1)
      );
      let mainTitle = "";
      switch (elem) {
        case "banner":
          mainTitle = "Banner";
          break;
        case "logo":
          mainTitle = "Logo";
          break;
        case "categorySlider":
          mainTitle = "Category Slider";
          break;
        case "secondSection":
          mainTitle = "Second Section";
          break;
        case "thirdSection":
          mainTitle = "Third Section";
          break;
        case "fourthSection":
          mainTitle = "Fourth Section";
          break;
        default:
          mainTitle = "";
      }
      return (
        <Card key={index}>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={`${index}`}
              onClick={() => this.cardChange(Heading[index])}
              className="c-accordion"
            >
              <i className="fa fa-angle-down"></i>
              {mainTitle}
            </Accordion.Toggle>
            {mainTitle !== "Logo" && (
              <Form.Check
                checked={this.state.data[elem].hide}
                type="checkbox"
                label="Hide"
                onChange={(e) =>
                  this.changeHandler("hide", elem, e.target.checked)
                }
                style={{
                  display: "inline-block",
                  marginLeft: "auto",
                }}
              />
            )}
            {mainTitle === "Banner" && (
              <Button
                onClick={() => this.setState({ isOpen: true })}
                style={{ marginLeft: "20px", display: "inline" }}
              >
                <i className="fa fa-plus"></i>Add Banner
              </Button>
            )}
          </Card.Header>
          {mainTitle !== "Banner" ? (
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                {SubHeading[index] !== undefined ? (
                  <TextForm
                    field={element[0] ? element[0] : element}
                    changeHandler={this.changeHandler}
                    sectionName={elem}
                    updateHandler={this.updateHandler}
                    subHeading={newSubheadings}
                  />
                ) : null}
                {this.state.data[elem].images !== undefined ? (
                  <ImageForm
                    Images={this.props.data[elem].images}
                    sectionName={elem}
                    handleImageChange={this.handleImageChange}
                    imagePreviewUrl={this.state[elem]}
                    optionChange={this.optionChange}
                    img={this.state.imagePreviewUrl}
                    // isCategory={true}
                    currentIndex={this.state[elem]}
                    imageSubmitHandler={this.imageSubmitHandler}
                  />
                ) : null}
              </Card.Body>
            </Accordion.Collapse>
          ) : (
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                <Collapse onChange={this.callback}>
                  {this.state.data[elem].map((elem1, index1) => {
                    let element1 = { ...elem1 };
                    delete element1.hide;
                    delete element1.images;
                    return (
                      // <>
                      <Panel
                        header={`Banner ${index1 + 1}`}
                        key={`${index}_${index1}`}
                      >
                        <TextForm
                          field={element1}
                          changeHandler={this.changeHandler}
                          sectionName={elem}
                          updateHandler={this.updateHandler}
                          subHeading={["Title", "Content", "Button Text"]}
                          index={index1}
                          hasDelete={true}
                          deleteHandler={this.deleteBanner}
                        />
                        <ImageForm
                          Images={[{ ...this.state.data[elem][index1].images }]}
                          sectionName={elem}
                          handleImageChange={this.handleImageChange}
                          imagePreviewUrl={[{ ...this.state[elem][index1] }]}
                          optionChange={this.optionChange}
                          img={this.state.imagePreviewUrl}
                          // isCategory={true}
                          mainIndex={index1}
                          imageSubmitHandler={this.imageSubmitHandler}
                        />
                      </Panel>

                      // </>
                    );
                  })}
                </Collapse>
              </Card.Body>
            </Accordion.Collapse>
          )}
        </Card>
      );
    });
    // console.log("check data", data);
    return (
      <div>
        {this.state.loading ? (
          <div>
            <div>
              <Spinner
                animation="border"
                style={{ position: "fixed", top: "20%", left: "60%" }}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          </div>
        ) : (
          <>
            <Modal show={this.state.isOpen}>
              <Modal.Header closeButton onClick={this.closeModal}>
                <Modal.Title>Add Banner</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.submitModal}>
                  <Form.Label>Title</Form.Label>
                  <AceEditor
                    value={this.state.formData.title}
                    onChange={(code) => {
                      const currentData = { ...this.state.formData };
                      currentData.title = code;
                      this.setState({ formData: currentData });
                    }}
                    mode="javascript"
                    theme="chrome"
                    placeholder="Enter Banner Title"
                    style={{
                      width: "100%",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                    setOptions={{
                      fontSize: 20,
                    }}
                  />

                  <Form.Label>Content</Form.Label>
                  <AceEditor
                    value={this.state.formData.content}
                    onChange={(code) => {
                      const currentData = { ...this.state.formData };
                      currentData.content = code;
                      this.setState({ formData: currentData });
                    }}
                    mode="javascript"
                    theme="chrome"
                    placeholder="Enter Banner Content"
                    style={{
                      width: "100%",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                    setOptions={{
                      fontSize: 20,
                    }}
                  />

                  <Form.Label>Button text</Form.Label>
                  <AceEditor
                    value={this.state.formData.btnText}
                    onChange={(code) => {
                      const currentData = { ...this.state.formData };
                      currentData.btnText = code;
                      this.setState({ formData: currentData });
                    }}
                    mode="javascript"
                    theme="chrome"
                    placeholder="Enter Button Text"
                    style={{
                      width: "100%",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                    setOptions={{
                      fontSize: 20,
                    }}
                  />

                  <Form.Check
                    checked={this.state.formData.hide}
                    type="checkbox"
                    label="Hide"
                    onChange={(e) => {
                      const currentData = { ...this.state.formData };
                      currentData.hide = e.target.checked;
                      this.setState({ formData: currentData });
                    }}
                    style={{
                      display: "inline-block",
                      marginLeft: "auto",
                    }}
                  />

                  <Form.Group>
                    <Form.Label style={{ display: "block" }}>
                      Banner Image
                    </Form.Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        let reader = new FileReader();
                        let file = e.target.files[0];
                        reader.onloadend = () => {
                          this.setState({ file });
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Accordion defaultActiveKey="0">{data}</Accordion>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.homeReducer.homeData,
    firstLoad: state.homeReducer.homeFirstLoad,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.get()),
    update: (data, section) => dispatch(actionCreators.update(data, section)),
    uploadImage: (formData, section) =>
      dispatch(actionCreators.updloadImage(formData, section)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
