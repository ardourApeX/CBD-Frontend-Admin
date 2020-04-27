import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Nav, Button, Accordion, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/category";
import cogoToast from "cogo-toast";
import ImageForm from "../../App/components/ImageForm";

const imageOptions = [["Oil-Page-Image"], [], [], [], [], [], []];
const Heading = [
	"Default",
	"Topicals",
	"Pets",
	"Edibles",
	"Capsules",
	"Oils",
	"Bundles",
];

const SubHeading = [
	["Banner Title", "Title", "Content", "Bundle Title", "Bundle Content"],
	["Banner Title", "Title", "Content", "Bundle Title", "Bundle Content"],
	["Banner Title", "Title", "Content", "Bundle Title", "Bundle Content"],
	["Banner Title", "Title", "Content", "Bundle Title", "Bundle Content"],
	["Banner Title", "Title", "Content", "Bundle Title", "Bundle Content"],
	["Banner Title", "Title", "Content", "Bundle Title", "Bundle Content"],
	["Banner Title", "Title", "Content", "Bundle Title", "Bundle Content"],
];
class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				default: {},
				topicals: {},
				pets: {},
				edibles: {},
				capsules: {},
				oils: {},
				bundles: {},
			},
			loading: true,
			file: "",
			imagePreviewUrl: "",
			imageName: "",
		};
		this.handleImageChange = this.handleImageChange.bind(this);
	}

	handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result,
			});
		};

		reader.readAsDataURL(file);
	}
	optionChange = (e) => {
		this.setState({
			imageName: e.target.value,
		});
		console.log("option change", e.target.name, e.target.value);
	};
	imageSubmitHandler = (e) => {
		console.log("Image upload", this.state);
		e.preventDefault();
		if (this.state.imageName.length > 0) {
			let formData = new FormData();
			formData.append("imageName", this.state.imageName);
			formData.append("image", this.state.file);
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
		console.log("updateHandler", section);
		event.preventDefault();
		this.props
			.update(this.state.data[section], section)
			.then((result) => {
				cogoToast.success(result);
				console.log(result);
			})
			.catch((err) => cogoToast.error(err));
	};
	componentDidMount = () => {
		console.log("Component mounted");
		this.props.get().then((result) => {
			cogoToast.success(result);
			this.setState(
				{
					data: { ...this.props.data },
					loading: false,
				},
				console.log(this.state)
			);
		});
	};

	toggleHandler = (event) => {
		console.log(event);
	};
	// clickHandler = () => {
	// 	console.log("Click handler");
	// };

	render() {
		let data = Object.keys(this.state.data || {}).map((elem, index) => {
			return (
				<Card key={index} onClick={this.clickHandler}>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey={index}>
							{Heading[index]}
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={index}>
						<Card.Body>
							<TextForm
								field={this.state.data[elem]}
								changeHandler={this.changeHandler}
								sectionName={elem}
								subHeading={SubHeading[index]}
								updateHandler={this.updateHandler}
							/>
							{imageOptions[index].length > 0 ? (
								<ImageForm
									options={imageOptions[index]}
									handleImageChange={this.handleImageChange}
									imageSubmitHandler={this.imageSubmitHandler}
									imagePreviewUrl={this.state.imagePreviewUrl}
									optionChange={this.optionChange}
								/>
							) : null}
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
					<Accordion defaultActiveKey="0">{data}</Accordion>
				)}
				{/* <Card title="Category">
					<Card.Header>
						<Nav variant="pills" defaultActiveKey="#image">
							<Nav.Item>
								<Nav.Link href="#text" onClick={this.toggleHandler}>
									Text
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href="#image" onClick={this.toggleHandler}>
									Images
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Card.Header>
					<Card.Body id="text">
						<Card>
							<Card.Title className="text-center">Pets</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.pets}
									changeHandler={this.changeHandler}
									sectionName="pets"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">Edibles</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.edibles}
									changeHandler={this.changeHandler}
									sectionName="edibles"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">Capsules</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.capsules}
									changeHandler={this.changeHandler}
									sectionName="capsules"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">Oils</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.oils}
									changeHandler={this.changeHandler}
									sectionName="oils"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">Bundles</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.bundles}
									changeHandler={this.changeHandler}
									sectionName="bundles"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
						<Card>
							<Card.Title className="text-center">Default</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.default}
									changeHandler={this.changeHandler}
									sectionName="default"
									updateHandler={this.updateHandler}
								/>
							</Card.Body>
						</Card>
					</Card.Body>
					<Card.Body id="image">
						<Card>
							<Card.Title className="text-center">Pets</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.pets}
									changeHandler={this.changeHandler}
									sectionName="pets"
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
		data: state.categoryReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		get: () => dispatch(actionCreators.get()),
		update: (data, section) => dispatch(actionCreators.update(data, section)),
		uploadImage: (data) => dispatch(actionCreators.uploadImage(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
