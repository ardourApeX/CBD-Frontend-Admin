import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Formik from "formik";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

export default class TextForm extends Component {
	render() {
		console.log(this.props.field);
		const sectionName = this.props.sectionName;
		let data = Object.keys(this.props.field).map((elem, index) => {
			return (
				<Container className="mt-3" key={index}>
					<h3 className="c-subHeading">{this.props.subHeading[index]}</h3>
					{/* <CKEditor
						editor={ClassicEditor}
						data={this.props.field[elem]}
						onInit={(editor) => {
							// You can store the "editor" and use when it is needed.
							// console.log("Editor is ready to use!", editor);
						}}
						onChange={
							(event, editor) =>
								this.props.changeHandler(elem, sectionName, editor.getData())
							// 	 {
							// 	const data = editor.getData();
							// 	const target = event.target;
							// 	console.log({ target, editor, data });
							// }
						}
						// onBlur={(event, editor) => {
						// 	console.log("Blur.", editor);
						// }}
						// onFocus={(event, editor) => {
						// 	console.log("Focus.", editor);
						// }}

						
					/> */}

					<Editor
						value={this.props.field[elem]}
						onValueChange={(code) =>
							this.props.changeHandler(elem, sectionName, code)}
						highlight={code => highlight(code, languages.js)}
						padding={10}
						style={{
							fontFamily: '"Fira code", "Fira Mono", monospace',
							fontSize: 12,
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
				<button
					className="c-btn c-btn--right c-btn--medium"
					onClick={(event) => this.props.updateHandler(event, sectionName)}
				>
					Update
				</button>
				<br />
				<br />
				<br />
				<hr />
			</div>
		);
	}
}