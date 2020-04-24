import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Nav, Button, Accordion } from "react-bootstrap";
import { Formik } from "formik";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/category";
import cogoToast from "cogo-toast";
class Category extends Component {
	state = {
		data: {
			topicals: {},
			pets: {},
			edibles: {},
			capsules: {},
			oils: {},
			bundles: {},

			default: {},
		},
		loading: true,
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
		});
		return (
			<div>
				{this.state.loading ? (
					<div>loading...</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
