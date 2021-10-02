import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Accordion, Spinner } from "react-bootstrap";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/shop";
import ImageForm from "../../App/components/ImageForm";
import cogoToast from "cogo-toast";

const Heading = ["Shop"];
const SubHeading = [["Title", "Bundle Title", "Bundle Subtitle"]];
const ImageOption = [[]];
class Shop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: { shop: {} },
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
		this.setState({ loading: true });
		console.log("updateHandler", section);
		event.preventDefault();
		this.props
			.update(this.state.data[section], section)
			.then((result) => {
				cogoToast.success(result);
				console.log(result);
				this.setState({ loading: false });
			})
			.catch((err) => {
				this.setState({ loading: false });
				cogoToast.error(err);
			});
	};

	componentDidMount = () => {
		console.log("Component mounted");
		this.props
			.get()
			.then((result) => {
				cogoToast.success(result);
				this.setState(
					{
						data: { ...this.props.data },
						loading: false,
					},
					console.log(this.state)
				);
			})
			.catch((err) => cogoToast.error(err));
	};

	render() {
		let data = Object.keys(this.state.data || {}).map((elem, index) => {
			return (
				<Card key={index}>
					<Card.Header>
						<Accordion.Toggle
							as={Button}
							variant="link"
							eventKey={`${index}`}
							className="c-accordion"
						>
							<i className="fa fa-angle-down"></i>
							{Heading[index]}
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={`${index}`}>
						<Card.Body>
							<TextForm
								field={this.state.data[elem]}
								changeHandler={this.changeHandler}
								sectionName={elem}
								updateHandler={this.updateHandler}
								subHeading={SubHeading[index]}
							/>
							<hr />
							{ImageOption[index] && ImageOption[index].length > 0 ? (
								<ImageForm
									options={ImageOption[index]}
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
				{/* <Card title="shop">
					<Card.Header>Shop</Card.Header>
					<Card.Body>
						<Card>
							<Card.Title className="text-center">Shop</Card.Title>
							<Card.Body>
								<TextForm
									field={this.state.shop}
									changeHandler={this.changeHandler}
									sectionName="shop"
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
		data: state.shopReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		get: () => dispatch(actionCreators.get()),
		update: (data, section) => dispatch(actionCreators.update(data, section)),
		uploadImage: (data) => dispatch(actionCreators.uploadImage(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
