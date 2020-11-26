import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/chrome";

export default class TextForm extends Component {
  render() {
    console.log(this.props.field);
    console.log(this.props.sectionName);
    const sectionName = this.props.sectionName;
    let data = Object.keys(this.props.field).map((elem, index) => {
      return (
        <Container className="mt-3" key={index}>
          <h3 className="c-subHeading">{this.props.subHeading[index]}</h3>

          <AceEditor
            value={this.props.field[elem]}
            onChange={(code) => {
              console.log(code);
              this.props.changeHandler(
                elem,
                sectionName,
                code,
                this.props.index
              );
            }}
            mode="javascript"
            theme="chrome"
            style={{ width: "100%", height: "100px" }}
            setOptions={{
              fontSize: 20,
            }}
          />
        </Container>
        // <Form.Group controlId="exampleForm.ControlInput1">
        // 	<Form.Label>{elem}</Form.Label>
        // 	<Form.Control
        // 		as="textarea"
        // 		name={elem}
        // 		value={this.props.field[elem]}
        // 		onChange={(event) => this.props.changeHandler(event, sectionName)}
        // 	/>
        // </Form.Group>
      );
    });
    return (
      <div>
        <Form>{data}</Form>
        <br />
        <div className="d-flex justify-content-center mt-5">
          <button
            className="btn btn-primary btn-lg"
            onClick={(event) =>
              this.props.updateHandler(event, sectionName, this.props.index)
            }
            style={{ width: "50%" }}
          >
            Update
          </button>
          {(typeof this.props.sectionName === "number" ||
            this.props.hasDelete) && (
            <button
              className="btn btn-danger btn-lg"
              onClick={(event) => this.props.deleteHandler(event, sectionName)}
              style={{ width: "50%" }}
            >
              Delete
            </button>
          )}
        </div>
        <br />
        <br />
        <br />
        <hr />
      </div>
    );
  }
}
