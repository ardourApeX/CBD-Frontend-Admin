import React, { Component } from "react";
import * as actionCreators from "../../store/actions/blog";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";
import DataTable from "../../App/components/DataTable";
import BlogForm from "../../App/components/BlogForm";
import Loader from "../../App/layout/Loader";
import { Button } from "react-bootstrap";

// const sections = ["Blog Table", "Add Blog", "Update Blog"];
class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			btnText: "Add Blog",
			section: 0,
			currentBlog: {
				heading: "",
				subHeading: "",
				content: "",
				tags: [],
			},
			file: "",
			imagePreviewUrl: "",
		};
		this.toggleHandler = this.toggleHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
		this.editHandler = this.editHandler.bind(this);
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
	toggleHandler = () => {
		let section = this.state.section;
		if (section === 0) {
			this.setState({
				section: 1,
				btnText: "All Blogs",
			});
		} else {
			this.setState({
				section: 0,
				btnText: "Add Blog",
			});
		}
	};
	editHandler = (index) => {
		const formData = new FormData();

		formData.append("image", this.state.file);
		Object.keys(this.state.currentBlog).forEach((key) =>
			formData.append(key, this.state.currentBlog[key])
		);
		formData.append("image", this.state.file);
		console.log(this.props.blogs[index]);
		this.props
			.update(index, formData)
			.then((result) => {
				cogoToast.success(result);
			})
			.catch((err) => cogoToast.error(err));
	};
	updateHandler = (index) => {
		this.setState({
			section: 2,
			btnText: "All Blogs",
			currentBlog: this.props.blogs[index],
		});
	};
	changeHandler = (name, value) => {
		console.log("change", name, value);
		let curValue = this.state.currentBlog;

		if (name === "tags") {
			let val = value.split(",");
			curValue[name] = val;
			this.setState(
				{
					currentBlog: curValue,
				},
				console.log(this.state)
			);
		} else {
			curValue[name] = value;
			this.setState({
				currentBlog: curValue,
			});
		}
	};

	submitHandler = () => {
		console.log("SubmitHandler");
		const formData = new FormData();
		Object.keys(this.state.currentBlog).forEach((key) =>
			formData.append(key, this.state.currentBlog[key])
		);
		formData.append("image", this.state.file);

		// formData.append("data", "abcdef");
		// let all = {
		// 	image: formData,
		// 	data: this.state.currentBlog,
		// };
		this.props
			.add(formData)
			.then((result) => {
				console.log("Success");
				cogoToast.success("Success");
			})
			.catch((err) => cogoToast.error(err));
	};

	pageHandler = (pageNo) => {
		console.log("pageHandler", pageNo);
		this.props.getAll(pageNo, this.props.size);
	};
	componentDidMount = () => {
		this.props
			.getAll(this.props.pageNo, this.props.size)
			.then((result) => {
				cogoToast.success(result);
			})
			.catch((err) => cogoToast.error(err));
	};
	render() {
		const data = this.props.blogs.map((elem, index) => {
			return (
				<tr>
					<td>{this.props.size * this.props.pageNo + index + 1}</td>
					<td>{elem.heading}</td>
					<td>
						<Button variant="warning" onClick={() => this.updateHandler(index)}>
							Edit
						</Button>
						<Button variant="danger">Delete</Button>
					</td>
				</tr>
			);
		});
		return (
			<div>
				<Button onClick={this.toggleHandler}>{this.state.btnText}</Button>
				{this.state.section === 0 ? (
					<DataTable
						header={["#", "Title", "actions"]}
						data={data}
						pageHandler={this.pageHandler}
						pageNo={this.props.pageNo}
					/>
				) : this.state.section === 1 ? (
					<BlogForm
						data={this.state.currentBlog}
						imagePreviewUrl={this.state.imagePreviewUrl}
						submitHandler={this.submitHandler}
						changeHandler={this.changeHandler}
						handleImageChange={this.handleImageChange}
					/>
				) : (
					<BlogForm
						data={this.state.currentBlog}
						imagePreviewUrl={this.state.imagePreviewUrl}
						submitHandler={this.editHandler}
						changeHandler={this.changeHandler}
						handleImageChange={this.handleImageChange}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogReducer.blogs,
		pageNo: state.blogReducer.pageNo,
		size: state.blogReducer.size,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAll: (pageNo, size) => dispatch(actionCreators.getAll(pageNo, size)),
		update: (index, data) => dispatch(actionCreators.update(index, data)),
		add: (data) => dispatch(actionCreators.add(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
