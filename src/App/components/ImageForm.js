import React from "react";
import { connect } from "react-redux";
import { IMAGE_URL } from "../../utilities/Axios/url";
import { Container, Row, Col, Button } from "react-bootstrap";
const ImageForm = ( {sectionName,imagePreviewUrl,img,...props} ) => {
	
	// console.log("url", imagePreviewUrl, sectionName);
	// let $imagePreview = null;
	// if (imagePreviewUrl) {
	// 	$imagePreview = (
	// 		<img src={imagePreviewUrl} style={{ width: "10%" }} className="mt-5" />
	// 	);
	// }
	let Img=[];
	
	 console.log("ima",props);
	const images = props.Images.map((elem, index) => {
		console.log(imagePreviewUrl[index]);
		return (
			<Col key={index}>
				<p>{elem}</p>
				<div className="box">
					
					{imagePreviewUrl[index].image.length > 0 ? (
					
					<div className="js--image-preview" style={{backgroundImage:`url(${imagePreviewUrl[index].image})`}}></div>
				) :<div className="js--image-preview" style={{backgroundImage:`url(${IMAGE_URL}/${elem}`}}></div>}
					
					<div className="upload-options">
					{(imagePreviewUrl[index].file)  ?	(
					<lable  onClick={(e)=> {props.imageSubmitHandler(e, sectionName, index);
						imagePreviewUrl[index].file="";
					}}>
						<p style={{marginTop:"1rem",fontSize: "x-large",color: "white"}}>Update</p>
						</lable>):(	
					<label>
					<input 
						type="file" 
						onChange={async(e) =>props.handleImageChange(e, sectionName, index)}
						accept="image/*" />
						
					</label>)}
					</div>
				</div>
			</Col>
		);
	});

	return (
		<Container>
			<Row>{images}</Row>
		</Container>
	);
}
	const mapStateToProps = (state, ownProps) => ({
		...ownProps,...state
	})

export default connect(mapStateToProps)(ImageForm);