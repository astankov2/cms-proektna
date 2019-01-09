import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

import './Sidebar.css';

export function Sidebar(props) {
	return (
		<div className="Sidebar">
			<div className="menu-item">
				<h2>Dashboard</h2>
			</div>
			<Link className="menu-item" to="/dashboard/table">
				<FontAwesomeIcon icon={faTable} />
				<span> </span>Data Table
			</Link>
			<Link className="menu-item" to="/dashboard/create">
				<FontAwesomeIcon icon={faPlus} />
				<span> </span>
				Create Post
			</Link>
		</div>
	);
}

export default Sidebar;