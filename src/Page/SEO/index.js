import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Accordion, Spinner, Modal, Form } from "react-bootstrap";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/seo";
import cogoToast from "cogo-toast";
import ImageForm from "../../App/components/ImageForm";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/chrome";

import FileBase from "react-file-base64";

class Seo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isOpen: false,
      formData: {
        title: "",
        titleContent: "",
        description: "",
        keywords: "",
      },
      data: [],
      seo: [],
    };
   
  }



  optionChange = (e) => {
    this.setState({
      imageName: e.target.value,
    });
    console.log("option change", e.target.name, e.target.value);
  };

  changeHandler = (name, section, data) => {
    console.log(name);
    console.log(section);
    console.log(data);
    let curValue = this.props.seo;
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
        this.setState({ loading: false, data: this.props.seo });
        console.log(result);
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
      });
  };
  deleteHandler = (event, section) => {
    event.preventDefault();
    this.setState({ loading: true });
    this.props
      .deletee(this.state.data[section]._id, section)
      .then((result) => {
        cogoToast.success(result.message);
        this.setState({
          loading: false,
          data: this.props.seo,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
      });
  };
  componentDidMount = () => {
    // console.log(this.props.data);
    console.log("Component mounted");
    this.props
      .get()
      .then((result) => {
        let newArray = new Array(this.props.seo.length).fill(
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
          data: this.props.seo,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
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

  addSeo = async (e) => {
    this.setState({ isOpen: false, loading: true });
    e.preventDefault();
 
    this.props
      .add(this.state.formData)
      .then((result) => {
        this.setState({
          loading: false,
          formData: {
            title: "",
            titleContent: "",
            description: "",
            keywords: "",
          },
          data: this.props.seo,

        });
        cogoToast.success(result);
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
      });
  };

  render() {
    console.log(this.state.data,this.props);
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
              {elem.title}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={`${index}`}>
            <Card.Body>
              <TextForm
                field={{
                  titleContent: elem.titleContent,
                  description: elem.description,
                  keywords: elem.keywords,
                }}
                changeHandler={this.changeHandler}
                sectionName={index}
                subHeading={["Title", "description", "keywords"]}
                updateHandler={this.updateHandler}
                deleteHandler={this.deleteHandler}
              />
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
              <Button variant="dark" size="sm" onClick={this.openModal}>
                Add Seo
              </Button>
            </div>
            <Modal show={this.state.isOpen}>
              <Modal.Header closeButton onClick={this.closeModal}>
                <Modal.Title>Add Seo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.addSeo}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      as="input"
                      type="text"
                      placeholder="Enter Seo Name (Name should be unique)"
                      value={this.state.formData.title}
                      onChange={(e) => {
                        const currentData = { ...this.state.formData };
                        currentData.title = e.target.value;
                        this.setState({ formData: currentData });
                      }}
                    />
                  </Form.Group>

                  <Form.Label>Title Content</Form.Label>
                  <AceEditor
                    value={this.state.formData.titleContent}
                    onChange={(code) => {
                      const currentData = { ...this.state.formData };
                      currentData.titleContent = code;
                      this.setState({ formData: currentData });
                    }}
                    mode="javascript"
                    theme="chrome"
                    placeholder="Enter Seo Title"
                    style={{ width: "100%", height: "100px" }}
                    setOptions={{
                      fontSize: 20,
                    }}
                  />

                  <Form.Label>Description</Form.Label>
                  <AceEditor
                    value={this.state.formData.description}
                    onChange={(code) => {
                      const currentData = { ...this.state.formData };
                      currentData.description = code;
                      this.setState({ formData: currentData });
                    }}
                    mode="javascript"
                    theme="chrome"
                    placeholder="Enter Seo Description"
                    style={{ width: "100%", height: "100px" }}
                    setOptions={{
                      fontSize: 20,
                    }}
                  />

                  <Form.Label>keywords</Form.Label>
                  <AceEditor
                    value={this.state.formData.keywords}
                    onChange={(code) => {
                      const currentData = { ...this.state.formData };
                      currentData.keywords = code;
                      this.setState({ formData: currentData });
                    }}
                    mode="javascript"
                    theme="chrome"
                    placeholder="Enter Seo keywords"
                    style={{ width: "100%", height: "100px" }}
                    setOptions={{
                      fontSize: 20,
                    }}
                  />
                  <Button variant="dark" size="sm" type="submit">
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={this.closeModal}>
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
    seo: state.seoReducer.seo,
    firstLoad: state.seoReducer.seoFirstLoad,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.get()),
    update: (data, section) => dispatch(actionCreators.update(data, section)),
    deletee: (data, section) => dispatch(actionCreators.deletee(data, section)),
    add: (data) => dispatch(actionCreators.add(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Seo);
