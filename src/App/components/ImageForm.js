import React from "react";
import { Form, Button } from "react-bootstrap";
export default function ImageForm(props) {
	let { imagePreviewUrl } = props;
	let $imagePreview = null;
	if (imagePreviewUrl) {
		$imagePreview = (
			<img src={imagePreviewUrl} style={{ width: "10%" }} className="mt-5" />
		);
	}
	const options = props.options.map((elem, index) => {
		return (
			<option key={index} value={elem}>
				{elem}
			</option>
		);
	});

	return (
		<Form.Group controlId="exampleForm.ControlSelect1">
			<Form.Label>Select Image</Form.Label>
			<Form.Control
				as="select"
				name="options"
				defaultValue="Please select one "
				onChange={props.optionChange}
			>
				<option>Please Select One</option>
				{options}
			</Form.Control>
			<br />
			{$imagePreview}
			<br />
			<input type="file" onChange={props.handleImageChange} className="mt-4" />
			<hr />
			<Button onClick={props.imageSubmitHandler}>Uplaod Image</Button>
		</Form.Group>
	);
}
