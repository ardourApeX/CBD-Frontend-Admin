import React, { Component } from "react";
import { Form,  Container } from "react-bootstrap";
import AceEditor from 'react-ace';
import 'brace/mode/javascript'
import 'brace/theme/chrome'

export default class TextForm extends Component {
	render() {
		console.log(this.props.field);
		const sectionName = this.props.sectionName; 
		let data = Object.keys(this.props.field).map((elem, index) => {
			return (
				<Container className="mt-3" key={index}>
					<h3 className="c-subHeading">{this.props.subHeading[index]}</h3>
	
					<AceEditor
						value={this.props.field[elem]}
						onChange={(code) =>
							this.props.changeHandler(elem, sectionName, code)}
						mode="javascript" theme="chrome"
						style={{width:"100%",height:"100px"}}
						setOptions={{
							fontSize:20,

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
				<br/>
				<div className="row col justify-content-center">
				<button
					className="btn btn-primary btn-lg btn-block"
					onClick={(event) => this.props.updateHandler(event, sectionName)}
					style={{width:"50%"}}
				>
					Update
				</button>
				</div>
				<br />
				<br />
				<br />
				<hr />
			</div>
		);
	}
}