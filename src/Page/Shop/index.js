import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Nav, Button, Accordion } from "react-bootstrap";
import { Formik } from "formik";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/shop";
import cogoToast from "cogo-toast";
class Shop extends Component {
	state = {
		data: { shop: {} },
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
