import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/chrome";
import { element } from "prop-types";

export default class TextForm extends Component {
	render() {
		console.log("Props value ", this.props);
		// console.log(this.props.sectionName);
		const sectionName = this.props.sectionName;
		const Data = () => (
			<div>
				{Object.keys(this.props.field).map((elem, index) => {
					if (sectionName == "seo") {
						if (
							elem == "_id" ||
							elem == "__v" ||
							elem == "createdAt" ||
							elem == "updatedAt"
						)
							return;
					}
					return (
						<Container className="mt-3" key={index}>
							<h3 className="c-subHeading">
								{this.props.subHeading ? this.props.subHeading[index] : ""}
							</h3>

							<AceEditor
								value={this.props.field[elem]}
								onChange={(code) => {
									console.log(code);
									this.props.changeHandler(
										elem,
										sectionName,
										code,
										this.props.index
									);
								}}
								mode="javascript"
								theme="chrome"
								style={{ width: "100%", height: "100px" }}
								setOptions={{
									fontSize: 20,
								}}
							/>
						</Container>
					);
				})}
				<div>
					<h3 style={{ marginLeft: "17px", marginTop: "30px" }}>Robot</h3>
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
								checked={this.props.robot.robot.split(",").includes("Follow")}
								onChange={(element) => {
									const newRobot = this.props.toggleRobot(
										element.target.value,
										this.props.robot.robot
									);
									this.props.changeHandler(
										"robot",
										sectionName,
										newRobot,
										this.props.index
									);
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
								checked={this.props.robot.robot.split(",").includes("Index")}
								onChange={(element) => {
									const newRobot = this.props.toggleRobot(
										element.target.value,
										this.props.robot.robot
									);
									this.props.changeHandler(
										"robot",
										sectionName,
										newRobot,
										this.props.index
									);
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
								checked={this.props.robot.robot
									.split(",")
									.includes("No Follow")}
								onChange={(element) => {
									const newRobot = this.props.toggleRobot(
										element.target.value,
										this.props.robot.robot
									);
									this.props.changeHandler(
										"robot",
										sectionName,
										newRobot,
										this.props.index
									);
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
								checked={this.props.robot.robot.split(",").includes("No Index")}
								onChange={(element) => {
									const newRobot = this.props.toggleRobot(
										element.target.value,
										this.props.robot.robot
									);
									this.props.changeHandler(
										"robot",
										sectionName,
										newRobot,
										this.props.index
									);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		);

		return (
			<div>
				<Data />
				<br />
				<div className="d-flex justify-content-center mt-5">
					<button
						className="btn btn-dark btn-lg"
						onClick={(event) =>
							this.props.updateHandler(event, sectionName, this.props.index)
						}
						style={{ width: "50%" }}
					>
						Update
					</button>
					{(typeof this.props.sectionName === "number" ||
						this.props.hasDelete) && (
						<button
							className="btn btn-danger btn-lg"
							onClick={(event) =>
								this.props.deleteHandler(event, sectionName, this.props.index)
							}
							style={{ width: "50%" }}
						>
							Delete
						</button>
					)}
				</div>
				<br />
				<br />
				<br />
				<hr />
			</div>
		);
	}
}
