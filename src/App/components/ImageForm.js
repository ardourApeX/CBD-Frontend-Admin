import React from "react";
import { IMAGE_URL } from "../../utilities/Axios/url";
import { Container, Row, Col, Button } from "react-bootstrap";
export default function ImageForm({ sectionName, ...props }) {
	let { imagePreviewUrl } = props;
	console.log("url", imagePreviewUrl, sectionName);
	// let $imagePreview = null;
	// if (imagePreviewUrl) {
	// 	$imagePreview = (
	// 		<img src={imagePreviewUrl} style={{ width: "10%" }} className="mt-5" />
	// 	);
	// }
	console.log("ima", props.Images);
	const images = props.Images.map((elem, index) => {
		return (
			<Col key={index}>
				<img
					// src="/Banner-Image-1.png"
					src={`${IMAGE_URL}/images/${elem}`}
					style={{ width: "5rem", height: "5rem" }}
					className="mt-5 mr-4"
				/>
				{imagePreviewUrl[index].image.length > 0 ? (
					<img
						src={imagePreviewUrl[index].image}
						style={{ width: "5rem", height: "5rem" }}
						className="mt-5"
					/>
				) : null}

				<br />
				<label className="c-input">
					<input
						type="file"
						onChange={(e) => props.handleImageChange(e, sectionName, index)}
						className="mt-4 c-input"
					/>
					{/* <i class="fa fa-cloud-upload"></i> */}
					Select one
				</label>
				<button
					onClick={(e) => props.imageSubmitHandler(e, sectionName, index)}
					className="c-btn"
				>
					<i class="fa fa-cloud-upload"></i> <span> Upload</span>
				</button>
				<hr />
			</Col>
		);
	});

	return (
		<Container>
			<Row>{images}</Row>
		</Container>
	);
}
