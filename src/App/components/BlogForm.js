import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, FormControl, InputGroup, Card } from "react-bootstrap";
// import ImageForm from

export default function BlogForm(props) {
	console.log("props", props);
	let { imagePreviewUrl } = props;
	let $imagePreview = null;
	if (imagePreviewUrl) {
		$imagePreview = (
			<img src={imagePreviewUrl} style={{ width: "5%" }} className="mt-5" />
		);
	}
	return (
		<div>
			<Card>
				<Card.Body>
					<label htmlFor="Heading">Heading</label>
					<InputGroup>
						<FormControl
							as="textarea"
							name="heading"
							value={props.data.heading}
							onChange={(e) =>
								props.changeHandler(e.target.name, e.target.value)
							}
						/>
					</InputGroup>
					<label htmlFor="SubHeading">SubHeading</label>
					<InputGroup>
						<FormControl
							as="textarea"
							name="subHeading"
							value={props.data.subHeading}
							onChange={(e) =>
								props.changeHandler(e.target.name, e.target.value)
							}
						/>
					</InputGroup>
					<label htmlFor="Content">Content</label>
					<CKEditor
						editor={ClassicEditor}
						data={props.data.content}
						onChange={(event, editor) =>
							props.changeHandler("content", editor.getData())
						}
					/>
					<label htmlFor="Tags">Tags</label>
					<InputGroup>
						<FormControl
							as="textarea"
							value={props.data.tags.join(",")}
							name="tags"
							onChange={(e) =>
								props.changeHandler(e.target.name, e.target.value)
							}
						/>
					</InputGroup>
					<label htmlFor="BlogImage">Blog Image</label>
					<br />
					{$imagePreview}
					<br />
					<input
						type="file"
						onChange={props.handleImageChange}
						className="mt-4"
					/>
					<hr />
					<Button onClick={props.submitHandler}>Submit</Button>
				</Card.Body>
			</Card>
		</div>
	);
}
