import React, { Component } from "react";
import { connect } from "react-redux";

import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import Aux from "../../../../hoc/_Aux";
import DEMO from "../../../../store/actions/constant";
import * as actionTypes from "../../../../store/actions/actions";
import { Link } from 'react-router-dom';
class NavBar extends Component {
	render() {
		let headerClass = [
			"navbar",
			"pcoded-header",
			"navbar-expand-lg",
			this.props.headerBackColor,
		];
		if (this.props.headerFixedLayout) {
			headerClass = [...headerClass, "headerpos-fixed"];
		}

		let toggleClass = ["mobile-menu"];
		if (this.props.collapseMenu) {
			toggleClass = [...toggleClass, "on"];
		}

		return (
			<Aux>
				<header className={headerClass.join(" ")}>
					<div className="m-header">
						<Link
							className={toggleClass.join(" ")}
							id="mobile-collapse1"
							to={DEMO.BLANK_LINK}
							onClick={this.props.onToggleNavigation}
						>
							<span />
						</Link>
						<Link to={DEMO.BLANK_LINK} className="b-brand">
							<Link to="/dashboard" className="b-brand">
								<img src="/logo-new.png" alt="logo" style={{ width: "10%" }} />
								<span className="b-title">Bene</span>
							</Link>
						</Link>
					</div>
					<Link className="mobile-menu" id="mobile-header" to={DEMO.BLANK_LINK}>
						<i className="feather icon-more-horizontal" />
					</Link>
					<div className="collapse navbar-collapse">
						<NavLeft />
						<NavRight rtlLayout={this.props.rtlLayout} />
					</div>
				</header>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		rtlLayout: state.rtlLayout,
		headerBackColor: state.headerBackColor,
		headerFixedLayout: state.headerFixedLayout,
		collapseMenu: state.collapseMenu,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
