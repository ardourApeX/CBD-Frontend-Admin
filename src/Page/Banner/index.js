import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Accordion, Spinner, Modal, Form } from "react-bootstrap";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/banner";
import cogoToast from "cogo-toast";
import ImageForm from "../../App/components/ImageForm";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/chrome";

import FileBase from "react-file-base64";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isOpen: false,
      formData: {
        bannerName: "",
        bannerTitle: "",
        subTitle: "",
        content: "",
        image: {},
        logo: {},
      },
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(name, base64, index, mainIndex) {
    const currentData = this.props.banners[mainIndex];
    if (index === 0) {
      currentData.image = {
        name,
        src: base64,
      };
    } else {
      currentData.logo = {
        name,
        src: base64,
      };
    }
    this.setState({ loading: true });
    this.props
      .update(currentData, mainIndex)
      .then((result) => {
        cogoToast.success(result.message);
        this.setState({ loading: false });
        console.log(result);
      })
      .catch((err) => cogoToast.error(err));
  }

  optionChange = (e) => {
    this.setState({
      imageName: e.target.value,
    });
    console.log("option change", e.target.name, e.target.value);
  };

  imageSubmitHandler = (e, section, index) => {
    console.log("Image upload", section, index, this.state);
    e.preventDefault();
    if (this.state[section][index].image.length > 0) {
      let formData = new FormData();
      formData.append("imageName", this.state[section][index].imageName);
      formData.append("image", this.state[section][index].file);
      this.props
        .uploadImage(formData)
        .then((result) => {
          cogoToast.success(result);
          this.setState({
            imageName: "",
            file: "",
            imagePreviewUrl: "",
          });
        })
        .catch((err) => cogoToast.error(err));
      console.log("image submit");
    } else {
      cogoToast.info("Please select an image");
    }
  };

  changeHandler = (name, section, data) => {
    // console.log(name);
    // console.log(section);
    // console.log(data);
    let curValue = this.props.banners;
    curValue[section][name] = data;
    this.setState(
      {
        data: curValue,
      }
      // console.log(this.state)
    );
    console.log("changed");
  };
  updateHandler = (event, section) => {
    // console.log("updateHandler", section);
    event.preventDefault();
    this.setState({ loading: true });
    this.props
      .update(this.props.banners[section], section)
      .then((result) => {
        cogoToast.success(result.message);
        this.setState({ loading: false });
        console.log(result);
      })
      .catch((err) => cogoToast.error(err));
  };
  deleteHandler = (event, section) => {
    event.preventDefault();
    this.setState({ loading: true });
    this.props
      .deletee(this.props.banners[section]._id, section)
      .then((result) => {
        cogoToast.success(result.message);
        this.setState({ loading: false });
      })
      .catch((err) => cogoToast.error(err));
  };
  componentDidMount = () => {
    // console.log(this.props.data);
    console.log("Component mounted");
    if (this.props.firstLoad) {
      this.props.get().then((result) => {
        // console.log(result);
        cogoToast.success(result);
        this.setState({ loading: false });
      });
    }
  };

  toggleHandler = (event) => {
    console.log(event);
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  addCategory = async (e) => {
    this.setState({ isOpen: false, loading: true });
    e.preventDefault();
    // console.log(this.state.formData);
    this.props.add(this.state.formData).then((result) => {
      cogoToast.success(result);
      this.setState({ loading: false });
    });
  };

  render() {
    // console.log(this.props.data);
    let data = this.props.banners.map((elem, index) => {
      console.log(elem);
      return (
        <Card key={index} onClick={this.clickHandler}>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={`${index}`}
              className="c-accordion"
            >
              <i className="fa fa-angle-down"></i>
              {elem.bannerName}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={`${index}`}>
            <Card.Body>
              <TextForm
                field={{
                  bannerTitle: elem.bannerTitle,
                  subTitle: elem.subTitle,
                  content: elem.content,
                }}
                changeHandler={this.changeHandler}
                sectionName={index}
                subHeading={["Title", "Sub Title", "Content"]}
                updateHandler={this.updateHandler}
                deleteHandler={this.deleteHandler}
              />
              {elem.image ? (
                <ImageForm
                  Images={[elem.image, elem.logo]}
                  sectionName={elem}
                  handleImageChange={this.handleImageChange}
                  imageSubmitHandler={this.imageSubmitHandler}
                  imagePreviewUrl={[]}
                  optionChange={this.optionChange}
                  img=""
                  isCategory={true}
                  mainIndex={index}
                />
              ) : null}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });

    return (
      <div>
        {this.state.loading ? (
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
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "1rem",
              }}
            >
              <Button onClick={this.openModal}>Add Banner</Button>
            </div>
            <Modal show={this.state.isOpen}>
              <Modal.Header closeButton onClick={this.closeModal}>
                <Modal.Title>Add Banner</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.addCategory}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      as="input"
                      type="text"
                      placeholder="Enter Category Name"
                      value={this.state.title}
                      onChange={(e) => {
                        const currentData = { ...this.state.formData };
                        currentData.bannerName = e.target.value;
                        this.setState({ formData: currentData });
                      }}
                    />
                  </Form.Group>

                  <Form.Label>Title</Form.Label>
                  <AceEditor
                    value={this.state.formData.bannerTitle}
                    onChange={(code) => {
                      const currentData = { ...this.state.formData };
                      currentData.bannerTitle = code;
                      this.setState({ formData: currentData });
                    }}
                    mode="javascript"
                    theme="chrome"
                    placeholder="Enter Banner Title"
                    style={{ width: "100%", height: "100px" }}
                    setOptions={{
                      fontSize: 20,
                    }}
                  />

                  <Form.Label>Sub Title</Form.Label>
                  <AceEditor
                    value={this.state.formData.subTitle}
                    onChange={(code) => {
                      const currentData = { ...this.state.formData };
                      currentData.subTitle = code;
                      this.setState({ formData: currentData });
                    }}
                    mode="javascript"
                    theme="chrome"
                    placeholder="Enter Banner Sub Title"
                    style={{ width: "100%", height: "100px" }}
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
                    style={{ width: "100%", height: "100px" }}
                    setOptions={{
                      fontSize: 20,
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
                        currentData.image = {
                          name,
                          src: base64,
                        };
                        this.setState({ formData: currentData });
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={{ display: "block" }}>
                      Banner Logo
                    </Form.Label>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64, name }) => {
                        const currentData = { ...this.state.formData };
                        currentData.logo = {
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    banners: state.bannerReducer.banners,
    firstLoad: state.bannerReducer.bannerFirstLoad,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.get()),
    update: (data, section) => dispatch(actionCreators.update(data, section)),
    deletee: (data, section) => dispatch(actionCreators.deletee(data, section)),
    add: (data) => dispatch(actionCreators.add(data)),
    // uploadImage: (data) => dispatch(actionCreators.uploadImage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
