import React, { Component } from "react";
import Sidebar from "./Sidebar";

export class DashboardView extends Component {
	render() {
		return (
			<div className="DashboardView">
				<Sidebar />
				<span id="page-wrap">
				</span>
			</div>
		);
	}
}

export default DashboardView;