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
      },
      data: [],
      banner: [],
      imageFile: "",
      logoFile: "",
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e, index, mainIndex, section) {
    console.log(this.state.category);
    console.log(index);
    console.log(mainIndex);
    let reader = new FileReader();
    let file = e.target.files[0];
    let currentData, imageData;
    reader.onloadend = () => {
      imageData = this.state.banner.map((a) => {
        return a.map((b) => {
          return { ...b };
        });
      });
      console.log(imageData);
      currentData = this.state.data.map((a) => {
        return { ...a };
      });
      if (index === 0) {
        currentData[mainIndex].image = {
          name: file.name,
          src: reader.result,
        };
      } else {
        currentData[mainIndex].logo = {
          name: file.name,
          src: reader.result,
        };
      }
      imageData[mainIndex][index].file = file;
      imageData[mainIndex][index].image = reader.result;
      // console.log(imageData);
      this.setState({
        data: currentData,
        banner: imageData,
        file,
      });
    };

    reader.readAsDataURL(file);
  }

  optionChange = (e) => {
    this.setState({
      imageName: e.target.value,
    });
    console.log("option change", e.target.name, e.target.value);
  };

  imageSubmitHandler = (e, section, index, mainIndex) => {
    console.log(index);
    console.log(mainIndex);
    e.preventDefault();
    if (this.state.data[mainIndex].image.src.length > 0) {
      let formData = new FormData();
      formData.append("imageName", this.state.data[mainIndex].image.name);
      formData.append("image", this.state.file);
      formData.append("index", index);
      formData.append("mainIndex", mainIndex);
      formData.append("id", section._id);
      this.props
        .uploadImage(formData)
        .then((result) => {
          console.log(result);
          cogoToast.success(result.data.message);
          let imageData = this.state.banner.map((a) => {
            return a.map((b) => {
              return { ...b };
            });
          });
          imageData[mainIndex][index].file = "";
          imageData[mainIndex][index].image = "";
          let data = [...this.state.data];
          data[mainIndex] = result.data.data;
          this.setState({
            imageName: "",
            file: "",
            imagePreviewUrl: "",
            banner: imageData,
            data,
          });
        })
        .catch((err) => {
          console.log(err);
          cogoToast.error(err);
        });
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
      .update(this.state.data[section], section)
      .then((result) => {
        cogoToast.success(result.message);
        this.setState({ loading: false, data: this.props.banners });
        console.log(result);
      })
      .catch((err) => cogoToast.error(err));
  };
  deleteHandler = (event, section) => {
    event.preventDefault();
    this.setState({ loading: true });
    this.props
      .deletee(this.state.data[section]._id, section)
      .then((result) => {
        let imageData = this.state.banner.map((a) => {
          return a.map((b) => {
            return { ...b };
          });
        });
        imageData.splice(section, 1);
        console.log(imageData);
        console.log(this.props.banners);
        cogoToast.success(result.message);
        this.setState({
          loading: false,
          data: this.props.banners,
          banner: imageData,
        });
      })
      .catch((err) => cogoToast.error(err));
  };
  componentDidMount = () => {
    // console.log(this.props.data);
    console.log("Component mounted");
    this.props.get().then((result) => {
      let newArray = new Array(this.props.banners.length).fill(
        new Array(2).fill({
          image: "",
          file: "",
          imageName: "",
        })
      );
      // console.log(result);
      cogoToast.success(result);
      this.setState({
        loading: false,
        banner: newArray,
        data: this.props.banners,
      });
    });
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

  addBanner = async (e) => {
    this.setState({ isOpen: false, loading: true });
    e.preventDefault();
    // console.log(this.state.formData);
    const formData = new FormData();
    Object.keys(this.state.formData).forEach((key) => {
      if (key === "bannerName") {
        formData.append(key, this.state.formData[key].toLowerCase());
      } else {
        formData.append(key, this.state.formData[key]);
      }
    });
    if (this.state.imageFile !== "") {
      formData.append("imageFile", this.state.imageFile);
    }
    if (this.state.logoFile !== "") {
      formData.append("logoFile", this.state.logoFile);
    }
    this.props
      .add(formData)
      .then((result) => {
        console.log(this.props.banners);
        let imageData = this.state.banner.map((a) => {
          return a.map((b) => {
            return { ...b };
          });
        });
        imageData.push(
          new Array(2).fill({
            image: "",
            file: "",
            imageName: "",
          })
        );
        this.setState({
          loading: false,
          formData: {
            bannerTitle: "",
            content: "",
            subTitle: "",
            bannerName: "",
          },
          data: this.props.banners,
          banner: imageData,
        });
        cogoToast.success(result);
      })
      .catch((err) => cogoToast.error(err));
  };

  render() {
    let data = this.state.data.map((elem, index) => {
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
                  imagePreviewUrl={this.state.banner[index]}
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
                <Form onSubmit={this.addBanner}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      as="input"
                      type="text"
                      placeholder="Enter Banner Name"
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        let reader = new FileReader();
                        let imageFile = e.target.files[0];
                        reader.onloadend = () => {
                          this.setState({ imageFile });
                        };
                        reader.readAsDataURL(imageFile);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={{ display: "block" }}>
                      Banner Logo
                    </Form.Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        let reader = new FileReader();
                        let logoFile = e.target.files[0];
                        reader.onloadend = () => {
                          this.setState({ logoFile });
                        };
                        reader.readAsDataURL(logoFile);
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
    uploadImage: (data) => dispatch(actionCreators.uploadImage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
