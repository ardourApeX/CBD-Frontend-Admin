import React, { Component } from "react";
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
class Home extends Component {
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
      imagePreviewUrl: "",
      formData: {
        title: "",
        content: "",
        images: {},
        btnText: "",
        hide: false,
      },
    };

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(name, base64, index, mainIndex, section) {
    console.log(index);
    console.log(section);
    console.log(mainIndex);
    let currentData;
    if (section === "banner") {
      currentData = [...this.state.data[section]];
      currentData[mainIndex].images = {
        name,
        src: base64,
      };
    } else {
      currentData = { ...this.state.data[section] };
      currentData.images[index] = {
        name,
        src: base64,
      };
    }
    console.log(currentData);
    // this.setState({ data: currentData });
    // this.setState({ loading: true });
    // this.props
    //   .update(currentData, section)
    //   .then((result) => {
    //     cogoToast.success(result);
    //     this.setState({ loading: false });
    //     console.log(result);
    //   })
    //   .catch((err) => cogoToast.error(err));
  }

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
      console.log("reached here");
      curValue[index][name] = data;
    } else {
      console.log("reached here 1");
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
      .catch((err) => cogoToast.error(err));
  };
  componentDidMount = () => {
    if (this.props.firstLoad) {
      this.props
        .get()
        .then((result) => {
          // cogoToast.success(result);
          // console.log(this.props.data);
          // this.setState({
          //   data: { ...this.props.data },
          //   loading: false,
          // });
          this.setState({
            loading: false,
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
          });
        })
        .catch((err) => {
          cogoToast.error(err);
        });
    }
  };
  cardChange = (card) => {};
  closeModal = () => {
    this.setState({
      isOpen: false,
      formData: {
        title: "",
        content: "",
        btntext: "",
        hide: "false",
        images: [],
      },
    });
  };

  submitModal = (e) => {
    e.preventDefault();
    let currentData = [...this.state.data.banner];
    currentData.push(this.state.formData);
    this.setState({
      loading: true,
      isOpen: false,
      formData: {
        title: "",
        content: "",
        btntext: "",
        hide: "false",
        images: [],
      },
    });
    this.props
      .update(currentData, "banner")
      .then((result) => {
        this.setState({ loading: false });
        cogoToast.success(result);
      })
      .catch((err) => cogoToast.error(err));
  };

  callback = (key) => console.log(key);

  deleteBanner = (e, section, index) => {
    e.preventDefault();
    let currentData = [...this.state.data[section]];
    currentData.splice(index, 1);
    this.props
      .update(currentData, "banner")
      .then((result) => {
        this.setState({ loading: false });
        cogoToast.success(result);
      })
      .catch((err) => cogoToast.error(err));
  };

  render() {
    // console.log(this.state.data);
    let data = Object.keys(this.props.data || {}).map((elem, index) => {
      // console.log(this.state.data[elem]);
      let element = { ...this.state.data[elem] };
      element[0] ? console.log("Element is Array") : delete element.hide;
      delete element.images;
      console.log(elem);
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
                    Images={this.state.data[elem].images}
                    sectionName={elem}
                    handleImageChange={this.handleImageChange}
                    imagePreviewUrl={this.state.data[elem]}
                    optionChange={this.optionChange}
                    img={this.state.imagePreviewUrl}
                    isCategory={true}
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
                          imagePreviewUrl={this.state.data[elem]}
                          optionChange={this.optionChange}
                          img={this.state.imagePreviewUrl}
                          isCategory={true}
                          mainIndex={index1}
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
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64, name }) => {
                        const currentData = { ...this.state.formData };
                        currentData.images = {
                          name,
                          src: base64,
                        };
                        this.setState({ formData: currentData });
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

        {/* <Card title="Home" isOption>
					<Card.Header>Home</Card.Header>
					<Card.Body>
						<Card>
							<Card.Title className="text-center">Banner</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.banner}
									changeHandler={this.changeHandler}
									sectionName="banner"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">CategorySlider</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.categorySlider}
									sectionName="categorySlider"
									changeHandler={this.changeHandler}
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">ThirdSection</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.thirdSection}
									changeHandler={this.changeHandler}
									sectionName="thirdSection"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">BundlesSlider</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.bundlesSlider}
									changeHandler={this.changeHandler}
									sectionName="bundlesSlider"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">FifthSection</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.fifthSection}
									changeHandler={this.changeHandler}
									sectionName="fifthSection"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
					</Card.Body>
				</Card> */}
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
    uploadImage: (data) => dispatch(actionCreators.uploadImage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
