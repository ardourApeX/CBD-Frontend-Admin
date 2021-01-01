import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Nav,
  Button,
  Accordion,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import { Collapse, Input } from "antd";
import "antd/dist/antd.css";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/learn";
import cogoToast from "cogo-toast";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/chrome";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Label } from "react-bootstrap";
const { Panel } = Collapse;

class Learn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isOpen: false,
      modalType: "",
      learnId: "",
      subLearnId: "",
      questionnaireId: "",
      modalValue: "",
      data: [],
      index: -1,
      index1: -1,
      index2: -1,
      modalType1: "",
      modalTitle: "",
      title: "",
      subTitle: "",
      content: "",
      questionnaire: [
        {
          question: "",
          answer: "",
        },
      ],
    };
  }

  callback = (key) => {
    console.log(key);
  };

  changeHandler = (index, index1, data) => {
    let currentData = this.state.data.map((a) => {
      return { ...a };
    });
    currentData[index].sublearn[index1].content = data;
    this.setState({ data: currentData });
  };

  changeHandler1 = (index, index1, index2, data) => {
    let currentData = this.state.data.map((a) => {
      return { ...a };
    });
    currentData[index].sublearn[index1].questionnaire[index2].answer = data;
    this.setState({ data: currentData });
  };

  updateHandler = (event, section) => {
    // console.log("updateHandler", section);
    event.preventDefault();
    this.setState({ loading: true });
    this.props
      .update(this.props.data[section], section)
      .then((result) => {
        cogoToast.success(result.message);
        this.setState({ loading: false });
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
      .deletee(this.props.data[section]._id, section)
      .then((result) => {
        cogoToast.success(result.message);
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
      });
  };
  componentDidMount = () => {
    console.log("here");
    this.props
      .get()
      .then((result) => {
        cogoToast.success(result.message);
        console.log(result);
        this.setState({ loading: false, data: result.data });
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
    this.setState({
      modalType: "",
      learnId: "",
      modalValue: "",
      loading: false,
      isOpen: false,
    });
  };

  addCategory = async (e) => {
    this.setState({ isOpen: false, loading: true });
    e.preventDefault();
    // console.log(this.state.formData);
    this.props
      .add(this.state.formData)
      .then((result) => {
        cogoToast.success(result);
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        cogoToast.error(err);
      });
  };

  titleExtra = (title, type, mainId, subId, id, index, index1, index2) => (
    <div
      style={{
        display: "flex",
        alignItems: "center !important",
      }}
    >
      <h5 style={{ fontWeight: "normal" }}>{title}</h5>
      <EditFilled
        style={{
          marginLeft: "30px",
          marginRight: "30px",
          fontSize: "25px",
          color: "#04a9f5",
        }}
        onClick={(event) => {
          event.stopPropagation();
          this.setState({ modalType1: "editName" });
          switch (type) {
            case "Learn":
              this.setState({
                modalType: type,
                learnId: mainId,
                modalValue: title,
                isOpen: true,
                index,
                modalTitle: "Edit Learn Title",
              });
              break;
            case "Sublearn":
              this.setState({
                modalType: type,
                learnId: mainId,
                subLearnId: subId,
                modalValue: title,
                isOpen: true,
                index,
                index1,
                modalTitle: "Edit Subtitle",
              });
              break;
            case "Questionnaire":
              this.setState({
                modalType: type,
                learnId: mainId,
                subLearnId: subId,
                questionnaireId: id,
                modalValue: title,
                isOpen: true,
                index,
                index1,
                index2,
                modalTitle: "Edit Question",
              });
              break;
            default:
              console.log("default");
          }
        }}
      />
      <DeleteFilled
        style={{ fontSize: "25px", color: "red" }}
        onClick={(event) => {
          event.stopPropagation();
          switch (type) {
            case "Learn":
              this.setState({ loading: true });
              this.props
                .deleteLearn(mainId, index)
                .then((result) => {
                  this.setState({ loading: false });
                  cogoToast.success(result);
                })
                .catch((err) => {
                  this.setState({ loading: false });
                  cogoToast.error(err);
                });
              break;
            case "Sublearn":
              this.setState({ loading: true });
              this.props
                .deleteSubLearn(mainId, subId, index, index1)
                .then((result) => {
                  this.setState({ loading: false });
                  cogoToast.success(result);
                })
                .catch((err) => {
                  this.setState({ loading: false });
                  cogoToast.error(err);
                });
              break;
            case "Questionnaire":
              this.setState({ loading: true });
              this.props
                .deleteQuestionnaire(subId, id, index, index1, index2)
                .then((result) => {
                  this.setState({ loading: false });
                  cogoToast.success(result);
                })
                .catch((err) => {
                  this.setState({ loading: false });
                  cogoToast.error(err);
                });
              console.log("learn");
              break;
            default:
              console.log("default");
          }
        }}
      />
    </div>
  );

  render() {
    let modalBody = null;
    if (this.state.modalType1 === "editName") {
      modalBody = (
        <div>
          <Input
            value={this.state.modalValue}
            onChange={(e) => {
              this.setState({ modalValue: e.target.value });
            }}
          />
          <Button
            style={{ marginTop: "20px" }}
            variant="secondary"
            onClick={() => {
              this.setState({ loading: true });
              switch (this.state.modalType) {
                case "Learn":
                  console.log("Main1", this.state.index);
                  this.props
                    .editLearn(
                      this.state.learnId,
                      this.state.modalValue,
                      this.state.index
                    )
                    .then((result) => {
                      cogoToast.success(result);
                      this.setState({
                        modalType: "",
                        learnId: "",
                        modalValue: "",
                        loading: false,
                        isOpen: false,
                        index: -1,
                      });
                    })
                    .catch((err) => {
                      this.setState({ loading: false });
                      cogoToast.error(err);
                    });
                  break;
                case "Sublearn":
                  this.props
                    .editSubLearn(
                      this.state.learnId,
                      this.state.subLearnId,
                      this.state.modalValue,
                      "subTitle",
                      this.state.index,
                      this.state.index1
                    )
                    .then((result) => {
                      cogoToast.success(result);
                      this.setState({
                        modalType: "",
                        learnId: "",
                        modalValue: "",
                        subLearnId: "",
                        loading: false,
                        isOpen: false,
                        index: -1,
                        index1: -1,
                      });
                    })
                    .catch((err) => {
                      this.setState({ loading: false });
                      cogoToast.error(err);
                    });
                  break;
                case "Questionnaire":
                  console.log("Reached here in");
                  this.props
                    .editQuestionnaire(
                      this.state.learnId,
                      this.state.subLearnId,
                      this.state.questionnaireId,
                      this.state.modalValue,
                      "question",
                      this.state.index,
                      this.state.index1,
                      this.state.index2
                    )
                    .then((result) => {
                      cogoToast.success(result);
                      this.setState({
                        modalType: "",
                        learnId: "",
                        modalValue: "",
                        loading: false,
                        isOpen: false,
                        subLearnId: "",
                        questionnaireId: "",
                        index: -1,
                        index1: -1,
                        index2: -1,
                      });
                    })
                    .catch((err) => {
                      this.setState({ loading: false });
                      cogoToast.error(err);
                    });
                  break;
                default:
                  console.log("default");
              }
            }}
          >
            Update
          </Button>
        </div>
      );
    } else if (this.state.modalType1 === "addData") {
      modalBody = (
        <div>
          {this.state.modalType === "Learn" && (
            <>
              <label>Title</label>
              <Input
                style={{
                  border: "none !important",
                  outline: "none !important",
                  boxShadow: "none !important",
                }}
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </>
          )}
          {this.state.modalType === "Sublearn" && (
            <>
              <label>Sub Title</label>
              <Input
                style={{
                  border: "none !important",
                  outline: "none !important",
                  boxShadow: "none !important",
                }}
                value={this.state.subTitle}
                onChange={(e) => this.setState({ subTitle: e.target.value })}
              />
              <label>Content</label>
              <AceEditor
                value={this.state.content}
                onChange={(code) => {
                  this.setState({ content: code });
                }}
                mode="javascript"
                theme="chrome"
                style={{ width: "100%", height: "100px" }}
                setOptions={{
                  fontSize: 20,
                }}
              />
            </>
          )}
          {(this.state.modalType === "Sublearn" ||
            this.state.modalType === "Questionnaire") && (
            <>
              {this.state.questionnaire.map((item, index) => (
                <Collapse
                  style={{ marginTop: "20px" }}
                  onChange={this.callback}
                >
                  <Panel header={`Question ${index + 1}`} key={`${index} + 1`}>
                    <div>
                      <label>Question</label>
                      <Input
                        style={{
                          border: "none !important",
                          outline: "none !important",
                          boxShadow: "none !important",
                        }}
                        value={item.question}
                        onChange={(e) => {
                          let currentData = this.state.questionnaire.map(
                            (a) => {
                              return { ...a };
                            }
                          );
                          currentData[index].question = e.target.value;
                          this.setState({ questionnaire: currentData });
                        }}
                      />
                      <label>Answer</label>
                      <AceEditor
                        value={item.answer}
                        onChange={(code) => {
                          let currentData = this.state.questionnaire.map(
                            (a) => {
                              return { ...a };
                            }
                          );
                          currentData[index].answer = code;
                          this.setState({ questionnaire: currentData });
                        }}
                        mode="javascript"
                        theme="chrome"
                        style={{ width: "100%", height: "100px" }}
                        setOptions={{
                          fontSize: 20,
                        }}
                      />
                    </div>
                  </Panel>
                </Collapse>
              ))}
              <Button
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  let currentData = this.state.questionnaire.map((a) => {
                    return { ...a };
                  });
                  currentData.push({
                    question: "",
                    answer: "",
                  });
                  this.setState({ questionnaire: currentData });
                }}
              >
                <PlusOutlined style={{ marginRight: "10px" }} />
                Add Question
              </Button>
            </>
          )}
          <Button
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              let questionnaire = this.state.questionnaire.map((a) => {
                return { ...a };
              });
              this.setState({ loading: true, isOpen: false });
              if (
                this.state.questionnaire.length === 1 &&
                this.state.questionnaire[0].question === ""
              ) {
                questionnaire.length = 0;
              }
              switch (this.state.modalType) {
                case "Learn":
                  this.props.addLearn(this.state.title).then((result) => {
                    cogoToast.success(result);
                    this.setState({
                      modalType1: "",
                      modalTitle: "",
                      loading: false,
                      modalType: "",
                      title: "",
                    });
                  });
                  break;
                case "Sublearn":
                  this.props
                    .addSubLearn(
                      this.state.learnId,
                      this.state.subTitle,
                      this.state.content,
                      questionnaire,
                      this.state.index
                    )
                    .then((result) => {
                      console.log("Reached here");
                      cogoToast.success(result);
                      this.setState({
                        learnId: "",
                        subTitle: "",
                        content: "",
                        questionnaire: [
                          {
                            question: "",
                            answer: "",
                          },
                        ],
                        modalType1: "",
                        modalTitle: "",
                        loading: false,
                      });
                    })
                    .catch((err) => {
                      console.log("In index");
                      cogoToast.error(err);
                      this.setState({
                        learnId: "",
                        subTitle: "",
                        content: "",
                        questionnaire: [
                          {
                            question: "",
                            answer: "",
                          },
                        ],
                        modalType1: "",
                        modalTitle: "",
                        loading: false,
                      });
                    });
                  break;
                case "Questionnaire":
                  this.props
                    .addQuestionnaire(
                      this.state.subLearnId,
                      questionnaire,
                      this.state.index,
                      this.state.index1
                    )
                    .then((result) => {
                      cogoToast.success(result);
                      this.setState({
                        subLearnId: "",
                        subTitle: "",
                        content: "",
                        questionnaire: [
                          {
                            question: "",
                            answer: "",
                          },
                        ],
                        modalType1: "",
                        modalTitle: "",
                        loading: false,
                      });
                    })
                    .catch((err) => {
                      cogoToast.error(err);
                      this.setState({
                        subLearnId: "",
                        subTitle: "",
                        content: "",
                        questionnaire: [
                          {
                            question: "",
                            answer: "",
                          },
                        ],
                        modalType1: "",
                        modalTitle: "",
                        loading: false,
                      });
                    });
                  break;
                default:
                  console.log("default");
              }
            }}
          >
            Submit
          </Button>
        </div>
      );
    }
    let data = this.props.data.map((elem, index) => {
      return (
        <Card key={index} onClick={this.clickHandler}>
          <Collapse onChange={this.callback}>
            <Panel
              header={this.titleExtra(
                elem.title,
                "Learn",
                elem._id,
                null,
                null,
                index
              )}
              key={index}
            >
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
                    this.setState({
                      modalType1: "addData",
                      isOpen: true,
                      modalTitle: "Add Learn",
                      learnId: elem._id,
                      index,
                      modalType: "Sublearn",
                    });
                  }}
                >
                  <PlusOutlined style={{ marginRight: "10px" }} />
                  Add Sublearn
                </Button>
              </div>
              <Collapse style={{ border: "none" }}>
                {elem.sublearn.map((elem1, index1) => (
                  <Panel
                    header={this.titleExtra(
                      elem1.subTitle,
                      "Sublearn",
                      elem._id,
                      elem1._id,
                      null,
                      index,
                      index1
                    )}
                    key={index1}
                  >
                    <h4>Content</h4>
                    <AceEditor
                      value={elem1.content}
                      onChange={(code) => {
                        console.log(code);
                        this.changeHandler(index, index1, code);
                      }}
                      mode="javascript"
                      theme="chrome"
                      style={{ width: "100%", height: "100px" }}
                      setOptions={{
                        fontSize: 20,
                      }}
                    />
                    <Button
                      style={{ marginTop: "20px" }}
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        this.setState({ loading: true });
                        this.props
                          .editSubLearn(
                            elem._id,
                            elem1._id,
                            this.state.data[index].sublearn[index1].content,
                            "content",
                            index,
                            index1
                          )
                          .then((result) => {
                            cogoToast.success(result);
                            this.setState({
                              modalType: "",
                              learnId: "",
                              modalValue: "",
                              subLearnId: "",
                              loading: false,
                            });
                          });
                      }}
                    >
                      Update
                    </Button>
                    <div style={{ display: "flex" }}>
                      <h4 style={{ marginTop: "20px" }}>Questions</h4>
                      <Button
                        style={{
                          marginLeft: "auto",
                          marginBottom: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          this.setState({
                            isOpen: true,
                            modalType1: "addData",
                            modalType: "Questionnaire",
                            index,
                            index1,
                            subLearnId: elem1._id,
                          });
                        }}
                      >
                        <PlusOutlined style={{ marginRight: "10px" }} />
                        Add Question
                      </Button>
                    </div>
                    {elem1.questionnaire.map((elem2, index2) => (
                      <Collapse style={{ marginTop: "10px", border: "none" }}>
                        <Panel
                          header={this.titleExtra(
                            elem2.question,
                            "Questionnaire",
                            elem._id,
                            elem1._id,
                            elem2._id,
                            index,
                            index1,
                            index2
                          )}
                          key={index2}
                        >
                          <AceEditor
                            value={elem2.answer}
                            onChange={(code) => {
                              console.log(code);
                              this.changeHandler1(index, index1, index2, code);
                            }}
                            mode="javascript"
                            theme="chrome"
                            style={{ width: "100%", height: "100px" }}
                            setOptions={{
                              fontSize: 20,
                            }}
                          />
                          <Button
                            style={{ marginTop: "20px" }}
                            variant="primary"
                            type="submit"
                            onClick={() => {
                              this.setState({ loading: true });
                              this.props
                                .editQuestionnaire(
                                  elem._id,
                                  elem1._id,
                                  elem2._id,
                                  this.state.data[index].sublearn[index1]
                                    .questionnaire[index2].answer,
                                  "answer",
                                  index,
                                  index1,
                                  index2
                                )
                                .then((result) => {
                                  cogoToast.success(result);
                                  this.setState({
                                    modalType: "",
                                    learnId: "",
                                    modalValue: "",
                                    subLearnId: "",
                                    loading: false,
                                  });
                                });
                            }}
                          >
                            Update
                          </Button>
                        </Panel>
                      </Collapse>
                    ))}
                  </Panel>
                ))}
              </Collapse>
            </Panel>
          </Collapse>
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
                  this.setState({
                    isOpen: true,
                    modalType1: "addData",
                    modalType: "Learn",
                  });
                }}
              >
                <PlusOutlined style={{ marginRight: "10px" }} />
                Add Learn
              </Button>
            </div>
            <Modal show={this.state.isOpen}>
              <Modal.Header closeButton onClick={this.closeModal}>
                <Modal.Title>{this.state.modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalBody}</Modal.Body>
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
    data: state.learnReducer.learnData,
    firstLoad: state.learnReducer.learnFirstLoad,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.get()),
    addLearn: (title) => dispatch(actionCreators.addLearn(title)),
    editLearn: (id, title, index) =>
      dispatch(actionCreators.editLearn(id, title, index)),
    deleteLearn: (mainId, index) =>
      dispatch(actionCreators.deleteLearn(mainId, index)),
    deleteSubLearn: (mainId, subId, index, index1) =>
      dispatch(actionCreators.deleteSubLearn(mainId, subId, index, index1)),
    deleteQuestionnaire: (subId, id, index, index1, index2) =>
      dispatch(
        actionCreators.deleteQuestionnaire(subId, id, index, index1, index2)
      ),
    editSubLearn: (mainId, subId, data, type, index, index1) =>
      dispatch(
        actionCreators.editSubLearn(mainId, subId, data, type, index, index1)
      ),
    addQuestionnaire: (subId, questionnaire, index, index1) =>
      dispatch(
        actionCreators.addQuestionnaire(subId, questionnaire, index, index1)
      ),
    editQuestionnaire: (mainId, subId, id, data, type, index, index1, index2) =>
      dispatch(
        actionCreators.editQuestionnaire(
          mainId,
          subId,
          id,
          data,
          type,
          index,
          index1,
          index2
        )
      ),
    addSubLearn: (mainId, subTitle, content, questionnaire, index) =>
      dispatch(
        actionCreators.addSubLearn(
          mainId,
          subTitle,
          content,
          questionnaire,
          index
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
