import React, { useEffect } from "react";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";

import DataTable from "../../App/components/DataTable";
import * as actionCreator from "../../store/actions/keyword";

export const Keyword = (props) => {
	const header = ["#", "Page", "count"];

	useEffect(() => {
		props
			.getPage()
			.then((result) => {
				cogoToast.success(result);
			})
			.catch((err) => {
				cogoToast.error(err);
			});
	}, []);

	const data = props.page.map((el, index) => {
		return (
			<tr>
				<td>{props.size * props.pageNo + index + 1}</td>
				<td>{el.pageName}</td>
				<td>
					<Button variant="warning" onClick={() => updateHandler(index)}>
						Edit
					</Button>
					<Button variant="danger">Delete</Button>
				</td>
			</tr>
		);
	});

	return (
		<div>
			<DataTable header={header} data={data} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	page: state.keywordReducer.page,
});

const mapDispatchToProps = {
	getPage: () => actionCreator.getPage(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyword);
