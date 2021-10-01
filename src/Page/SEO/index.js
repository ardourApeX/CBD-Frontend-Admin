import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Accordion, Spinner, Modal, Form } from "react-bootstrap";
import TextForm from "../../App/components/TextForm";
import * as actionCreators from "../../store/actions/seo";
import cogoToast from "cogo-toast";
import ImageForm from "../../App/components/ImageForm";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/chrome";

import FileBase from "react-file-base64";
import { configConsumerProps } from "antd/lib/config-provider";

class Seo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			isOpen: false,
			formData: {
				title: "",
				titleContent: "",
				description: "",
				keywords: "",
				og_type: "",
				og_title: "",
				og_description: "",
				og_image: "",
				og_url: "",
				og_siteName: "",
				robot: "",
			},
			data: [],
			seo: [],
		};
	}

	optionChange = (e) => {
		this.setState({
			imageName: e.target.value,
		});
		// console.log("option change", e.target.name, e.target.value);
	};

	changeHandler = (name, section, data) => {
		console.log("CHANGE HANDLER");
		console.log(name);
		console.log(section);
		console.log(data);
		//section -> SEO index number
		//name -> subHeading
		//data -> editor value for that particular subHeading
		let curValue = this.props.seo;
		curValue[section][name] = data;
		this.setState(
			{
				data: curValue,
			}
			// console.log(this.state)
		);
		console.log("changed");
	};
	updateHandler = (event, section) => {
		console.log("updateHandler", section);
		event.preventDefault();
		this.setState({ loading: true });
		console.log("UPDATE HANDLER ", section);

		this.props
			.update(this.state.data[section], section)
			.then((result) => {
				cogoToast.success(result.message);
				this.setState({ loading: false, data: this.props.seo });
				console.log(result);
			})
			.catch((err) => {
				this.setState({ loading: false });
				cogoToast.error(err);
			});
	};
	deleteHandler = (event, section) => {
		event.preventDefault();
		this.setState({ loading: true });
		this.props
			.deletee(this.state.data[section]._id, section)
			.then((result) => {
				cogoToast.success(result.message);
				this.setState({
					loading: false,
					data: this.props.seo,
				});
			})
			.catch((err) => {
				this.setState({ loading: false });
				cogoToast.error(err);
			});
	};
	componentDidMount = () => {
		console.log(this.props);
		console.log("Component mounted");
		this.props
			.get()
			.then((result) => {
				let newArray = new Array(this.props.seo.length).fill(
					new Array(2).fill({
						image: "",
						file: "",
						imageName: "",
					})
				);
				cogoToast.success(result);
				this.setState({
					loading: false,
					banner: newArray,
					data: this.props.seo,
				});
			})
			.catch((err) => {
				this.setState({ loading: false });
				cogoToast.error(err);
			});
	};

	toggleHandler = (event) => {
		console.log(event);
	};

	openModal = () => {
		this.setState({ isOpen: true });
	};

	closeModal = () => {
		this.setState({ isOpen: false });
	};

	addSeo = async (e) => {
		this.setState({ isOpen: false, loading: true });
		e.preventDefault();

		this.props
			.add(this.state.formData)
			.then((result) => {
				this.setState({
					loading: false,
					formData: {
						title: "",
						titleContent: "",
						description: "",
						keywords: "",
						og_type: "",
						og_title: "",
						og_description: "",
						og_image: "",
						og_url: "",
						og_siteName: "",
						robot: "",
					},
					data: this.props.seo,
				});
				cogoToast.success(result);
			})
			.catch((err) => {
				this.setState({ loading: false });
				cogoToast.error(err);
			});
	};
	toggleRobot = (tagName, robotString) => {
		const robotList = robotString.split(",");
		if (robotList.includes(tagName)) {
			return robotList.filter((item) => item !== tagName).join(",");
		} else {
			tagName = robotString !== "" ? `,${tagName}` : tagName;
			return robotString + tagName;
		}
	};

	render() {
		// Accordion UI Prop
		let data = this.state.data.map((elem, index) => {
			console.log("Elem Value", elem);
			return (
				<div>
					<Card key={index} onClick={this.clickHandler}>
						<Card.Header>
							<Accordion.Toggle
								as={Button}
								variant="link"
								eventKey={`${index}`}
								className="c-accordion"
							>
								<i className="fa fa-angle-down"></i>
								{elem.title}
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey={`${index}`}>
							<Card.Body>
								<TextForm
									field={{
										titleContent: elem.titleContent,
										description: elem.description,
										keywords: elem.keywords,
										og_type: elem.og_type,
										og_title: elem.og_title,
										og_description: elem.og_description,
										og_image: elem.og_image,
										og_url: elem.og_url,
										og_siteName: elem.og_siteName,
									}}
									robot={{
										robot: elem.robot,
									}}
									changeHandler={this.changeHandler}
									sectionName={index}
									subHeading={[
										"Title",
										"Description",
										"Keywords",
										"OG Type",
										"OG Title",
										"OG Description",
										"OG Image",
										"OG URL",
										"OG Sitename",
									]}
									updateHandler={this.updateHandler}
									deleteHandler={this.deleteHandler}
									toggleRobot={this.toggleRobot}
								/>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</div>
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
					<>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								marginBottom: "1rem",
							}}
						>
							<Button variant="dark" size="sm" onClick={this.openModal}>
								Add Seo
							</Button>
						</div>

						{/* Adding custom SEO */}
						<Modal show={this.state.isOpen}>
							<Modal.Header closeButton onClick={this.closeModal}>
								<Modal.Title>Add Seo</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form onSubmit={this.addSeo}>
									<Form.Group controlId="formBasicEmail">
										<Form.Label>Name</Form.Label>
										<Form.Control
											as="input"
											type="text"
											placeholder="Enter Seo Name (Name should be unique)"
											value={this.state.formData.title}
											onChange={(e) => {
												const currentData = { ...this.state.formData };
												currentData.title = e.target.value;
												this.setState({ formData: currentData });
											}}
										/>
									</Form.Group>

									<Form.Label>Title Content</Form.Label>
									<AceEditor
										value={this.state.formData.titleContent}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.titleContent = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo Title"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>

									<Form.Label>Description</Form.Label>
									<AceEditor
										value={this.state.formData.description}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.description = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo Description"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>

									<Form.Label>Keywords</Form.Label>
									<AceEditor
										value={this.state.formData.keywords}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.keywords = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo keywords"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>
									<Form.Label>OG Type</Form.Label>
									<AceEditor
										value={this.state.formData.og_type}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.og_type = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo OG type"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>
									<Form.Label>OG Title</Form.Label>
									<AceEditor
										value={this.state.formData.og_title}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.og_title = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo OG Title"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>
									<Form.Label>OG Description</Form.Label>
									<AceEditor
										value={this.state.formData.og_description}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.og_description = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo OG Description"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>
									<Form.Label>OG Image</Form.Label>
									<AceEditor
										value={this.state.formData.og_image}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.og_image = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo OG Image"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>
									<Form.Label>OG URL</Form.Label>
									<AceEditor
										value={this.state.formData.og_url}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.og_url = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo OG URL"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>
									<Form.Label>OG Sitename</Form.Label>
									<AceEditor
										value={this.state.formData.og_siteName}
										onChange={(code) => {
											const currentData = { ...this.state.formData };
											currentData.og_siteName = code;
											this.setState({ formData: currentData });
										}}
										mode="javascript"
										theme="chrome"
										placeholder="Enter Seo OG Sitename"
										style={{ width: "100%", height: "100px" }}
										setOptions={{
											fontSize: 20,
										}}
									/>
									<Form.Label>Robot</Form.Label>
									<div
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											padding: "0 20px",
										}}
										class="meta-check"
									>
										<div>
											<label
												style={{ marginRight: "10px" }}
												class="meta-check-label"
												for="follow"
											>
												Follow
											</label>
											<input
												class="meta-check-input"
												type="checkbox"
												value="Follow"
												id="follow"
												onChange={(event) => {
													const currentData = { ...this.state.formData };
													currentData.robot = this.toggleRobot(
														event.target.value,
														currentData.robot
													);

													this.setState({ formData: currentData });
												}}
											/>
										</div>
										<div>
											<label
												style={{ marginRight: "10px" }}
												class="meta-check-label"
												for="index"
											>
												Index
											</label>
											<input
												class="meta-check-input"
												type="checkbox"
												value="Index"
												id="index"
												onChange={(event) => {
													const currentData = { ...this.state.formData };
													currentData.robot = this.toggleRobot(
														event.target.value,
														currentData.robot
													);

													this.setState({ formData: currentData });
												}}
											/>
										</div>
										<div>
											<label
												style={{ marginRight: "10px" }}
												class="meta-check-label"
												for="nofollow"
											>
												No Follow
											</label>
											<input
												class="meta-check-input"
												type="checkbox"
												value="No Follow"
												id="nofollow"
												onChange={(event) => {
													const currentData = { ...this.state.formData };
													currentData.robot = this.toggleRobot(
														event.target.value,
														currentData.robot
													);

													this.setState({ formData: currentData });
												}}
											/>
										</div>
										<div>
											<label
												style={{ marginRight: "10px" }}
												class="meta-check-label"
												for="noindex"
											>
												No Index
											</label>
											<input
												class="meta-check-input"
												type="checkbox"
												value="No Index"
												id="noindex"
												onChange={(event) => {
													const currentData = { ...this.state.formData };
													currentData.robot = this.toggleRobot(
														event.target.value,
														currentData.robot
													);
													this.setState({ formData: currentData });
												}}
											/>
										</div>
									</div>
									<Button variant="dark" size="sm" type="submit">
										Submit
									</Button>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" size="sm" onClick={this.closeModal}>
									Close
								</Button>
							</Modal.Footer>
						</Modal>
						{/* Rendering all the seo(s) */}
						<Accordion defaultActiveKey="0">{data}</Accordion>
					</>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		seo: state.seoReducer.seo,
		firstLoad: state.seoReducer.seoFirstLoad,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		get: () => dispatch(actionCreators.get()),
		update: (data, section) => dispatch(actionCreators.update(data, section)),
		deletee: (data, section) => dispatch(actionCreators.deletee(data, section)),
		add: (data) => dispatch(actionCreators.add(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Seo);
