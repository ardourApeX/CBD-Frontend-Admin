import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import cogoToast from "cogo-toast";
import * as actionCreators from "../../../store/actions/authentication";

class SignIn extends React.Component {
	state = {
		email: "",
		password: "",
	};
	changeHandler = (event) => {
		console.log("I came here", this.state);
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	submitHandler = () => {
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		// console.log(emailPattern.test(this.state.email));
		if (this.state.email.length === 0 || this.state.password.length === 0) {
			cogoToast.info("Please fill up all fields");
		} else if (!emailPattern.test(this.state.email)) {
			cogoToast.info("Please enter a valid email");
		} else {
			this.props
				.submit(this.state.email, this.state.password)
				.then(() => {
					cogoToast.success("Successfully logged in");
					this.props.history.push("/");
				})
				.catch((err) => cogoToast.error(err));
		}
	};
	render() {
		return (
			<Aux>
				<Breadcrumb />
				<div className="auth-wrapper">
					<div className="auth-content">
						<div className="auth-bg">
							<span className="r" />
							<span className="r s" />
							<span className="r s" />
							<span className="r" />
						</div>
						<div className="card">
							<div className="card-body text-center">
								<div className="mb-4">
									<i className="feather icon-unlock auth-icon" />
								</div>
								<h3 className="mb-4">Login</h3>
								<div className="input-group mb-3">
									<input
										type="email"
										name="email"
										className="form-control"
										placeholder="Email"
										onChange={this.changeHandler}
										value={this.state.email}
									/>
								</div>
								<div className="input-group mb-4">
									<input
										type="password"
										className="form-control"
										placeholder="password"
										name="password"
										onChange={this.changeHandler}
										value={this.state.password}
									/>
								</div>
								<div className="form-group text-left">
									<div className="checkbox checkbox-fill d-inline">
										<input
											type="checkbox"
											name="checkbox-fill-1"
											id="checkbox-fill-a1"
										/>
										<label htmlFor="checkbox-fill-a1" className="cr">
											{" "}
											Save credentials
										</label>
									</div>
								</div>
								<button
									className="btn btn-primary shadow-2 mb-4"
									onClick={this.submitHandler}
								>
									Login
								</button>
								<p className="mb-2 text-muted">
									Forgot password?{" "}
									<NavLink to="/auth/reset-password-1">Reset</NavLink>
								</p>
								<p className="mb-0 text-muted">
									Don’t have an account?{" "}
									<NavLink to="/auth/signup-1">Signup</NavLink>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Aux>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		submit: (email, password) =>
			dispatch(actionCreators.login(email, password)),
	};
};
export default connect(null, mapDispatchToProps)(SignIn);
