import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Formik } from "formik";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/home";
import cogoToast from "cogo-toast";
class Home extends Component {
	state = {
		data: {
			banner: {
				title: "a",
				content: "b",
				btnText: "c",
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
		loading: true,
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
		console.log("updateHandler", section);
		event.preventDefault();
		this.props
			.update(this.state[section], section)
			.then((result) => {
				cogoToast.success(result);
			})
			.catch((err) => cogoToast.error(err));
	};
	componentDidMount = () => {
		console.log("Component mounted");
		this.props.get().then((result) => {
			console.log(this.props.data);
			this.setState(
				{
					data: { ...this.props.data },
					loading: false,
				},
				console.log(this.state)
			);
		});
	};

	render() {
		let data = Object.keys(this.state.data || {}).map((elem, index) => {
			return (
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey={index}>
							{elem}
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={index}>
						<Card.Body>
							<TextForm
								field={this.state.data[elem]}
								changeHandler={this.changeHandler}
								sectionName={elem}
								updateHandler={this.updateHandler}
							/>
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
		return (
			<div>
				{this.state.loading ? (
					<div>Loading</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
