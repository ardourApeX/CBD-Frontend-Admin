import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Spinner } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import TextForm from "../../App/components/TextForm";
import ImageForm from "../../App/components/ImageForm";
import * as actionCreators from "../../store/actions/home";
import cogoToast from "cogo-toast";
const Images = [
	["Logo-nav.png", "Logo-chat.png", "Logo.png"],
	["Banner-Image-1.png", "Banner-Image-2.png"],
	[],
	["Bundle-Image.png"],
	[],
	["Consult-Image.png", "Wellness-Image-1.png"],
];
const Heading = [
	"Logo",
	"Banner",
	"Category Slider",
	"Third Section",
	"Bundles Slider",
	"Fifth Section",
];
const SubHeading = [,
	["Title", "Content", "Button Text"],
	["Title"],
	["Title", "Sub Title", "Content", "Button Text"],
	["Title", "Sub Title", "Button Text"],
	["Title", "Content", "Button Text"],
];
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				logo:"",
				banner: {
					title: "",
					content: "",
					btnText: "",
				},
				categorySlider: {
					title: "",
				},
				thirdSection: {
					bigTitle: "",
					title: "",
					content: "",
					btnText: "",
				},
				bundlesSlider: {
					title: "",
					subTitle: "",
					btnText: "",
				},
				fifthSection: {
					title: "",
					content: "",
					btnText: "",
				},
			},
			banner: [
				{ image: "", file: "", imageName: "Banner-Image-1" },
				{ image: "", file: "", imageName: "Banner-Image-2" },
			],
			logo:[
				{ image: "", file: "", imageName: "Logo-nav" },
				{ image: "", file: "", imageName: "Logo-chat" },
				{ image: "", file: "", imageName: "Logo" },
			],
			thirdSection: [{ image: "", file: "", imageName: "Bundle-Image" }],
			fifthSection: [
				{ image: "", file: "", imageName: "Consult-Image" },
				{ image: "", file: "", imageName: "Wellness-Image-1" },
			],

			loading: true,
			file: "",
			imagePreviewUrl: "",
			imageName: "",
		};

		this.handleImageChange = this.handleImageChange.bind(this);
	}

	handleImageChange(e, section, index) {
		console.log("imagehandle", section, index);
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			console.log("In reader");
			let curValue = this.state[section];
			curValue[index].image = reader.result;
			curValue[index].file = file;
			this.setState(
				{
					[section]: curValue,
					imagePreviewUrl: reader.result,
				},
				console.log(this.state)
			);
		};

		reader.readAsDataURL(file);
	}
	optionChange = (e) => {
		this.setState({
			imageName: e.target.value,
		});
		console.log("option change", e.target.name, e.target.value);
	};
	imageSubmitHandler = (e, section, index) => {
		console.log("Image upload", section, index, this.state);
		e.preventDefault();
		if (this.state[section][index].image.length > 0) {
			let formData = new FormData();
			formData.append("imageName", this.state[section][index].imageName);
			formData.append("image", this.state[section][index].file);
			this.props
				.uploadImage(formData)
				.then((result) => {
					cogoToast.success(result);
					this.setState({
						imageName: "",
						file: "",
						imagePreviewUrl: "",
					});
				})
				.catch((err) => cogoToast.error(err));
			console.log("image submit");
		} else {
			cogoToast.info("Please select an image");
		}
	};

	changeHandler = (name, section, data) => {
		console.log(name, section, data);
		let curValue = this.state.data[section];
		curValue[name] = data;
		this.setState(
			{
				section: curValue,
			}
			// console.log(this.state)
		);
		// console.log("change", event.target, section);
	};
	updateHandler = (event, section) => {
		// console.log("updateHandler", section);
		event.preventDefault();
		this.props
			.update(this.state.data[section], section)
			.then((result) => {
				cogoToast.success(result);
			})
			.catch((err) => cogoToast.error(err));
	};
	componentDidMount = () => {
		// console.log("Component mounted");
		this.props
			.get()
			.then((result) => {
				cogoToast.success(result);
				// console.log(this.props.data);
				this.setState(
					{
						data: { ...this.props.data },
						loading: false,
					}
					// console.log(this.state)
				);
			})
			.catch((err) => {
				cogoToast.error(err);
			});
	};
	cardChange = (card) => {};
	render() {
		let data = Object.keys(this.state.data || {}).map((elem, index) => {
			
			return (
				<Card key={index}>
					<Card.Header>
						<Accordion.Toggle
							as={Button}
							variant="link"
							eventKey={`${index}`}
							onClick={() => this.cardChange(Heading[index])}
							className="c-accordion"
						>
							<i className="fa fa-angle-down"></i>
							{Heading[index]}
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={`${index}`}>
						<Card.Body>
						
						{SubHeading[index]!==undefined ? (
						<TextForm 
							field={this.state.data[elem]}
								changeHandler={this.changeHandler}
								sectionName={elem}
								updateHandler={this.updateHandler}
								subHeading={SubHeading[index]}
							/>):null}
							{(Images[index].length > 0) ? (
								<ImageForm
									Images={Images[index]}
									sectionName={elem}
									handleImageChange={this.handleImageChange}
									imageSubmitHandler={this.imageSubmitHandler}
									imagePreviewUrl={this.state[elem]}
									optionChange={this.optionChange}
									img={this.state.imagePreviewUrl}
								/>
							) : null}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			);
			// <Card>
			// 	<Card.Header>
			// 		<Accordion.Toggle as={Button} variant="link" eventKey="1">
			// 			Click me!
			// 		</Accordion.Toggle>
			// 	</Card.Header>
			// 	<Accordion.Collapse eventKey="1">
			// 		<Card.Body>Hello! I'm another body</Card.Body>
			// 	</Accordion.Collapse>
			// </Card>
		});
		console.log("check data",data);
		return (
			<div>
				{this.state.loading ? (
					<div>
						<div>
							<Spinner
								animation="border"
								style={{ position: "fixed", top: "20%", left: "60%" }}
								role="status"
							>
								<span className="sr-only">Loading...</span>
							</Spinner>
						</div>
					</div>
				) : (
					<Accordion defaultActiveKey="0">{data}</Accordion>
				)}

				{/* <Card title="Home" isOption>
					<Card.Header>Home</Card.Header>
					<Card.Body>
						<Card>
							<Card.Title className="text-center">Banner</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.banner}
									changeHandler={this.changeHandler}
									sectionName="banner"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">CategorySlider</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.categorySlider}
									sectionName="categorySlider"
									changeHandler={this.changeHandler}
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">ThirdSection</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.thirdSection}
									changeHandler={this.changeHandler}
									sectionName="thirdSection"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">BundlesSlider</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.bundlesSlider}
									changeHandler={this.changeHandler}
									sectionName="bundlesSlider"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">FifthSection</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.fifthSection}
									changeHandler={this.changeHandler}
									sectionName="fifthSection"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
					</Card.Body>
				</Card> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.homeReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		get: () => dispatch(actionCreators.get()),
		update: (data, section) => dispatch(actionCreators.update(data, section)),
		uploadImage: (data) => dispatch(actionCreators.uploadImage(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
