import React, { Component } from "react";
import { Button } from 'reactstrap';
import { Redirect } from 'react-router';
import ReactTable from "react-table";
import moment from 'moment';

import 'react-table/react-table.css';

import Sidebar from "./Sidebar";
import DeletePostModal from "./DeletePostModal";
import Post from "../../api/post";

export class CreatePostView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			deleteModalIsOpen: false,
			selectedRow: null,
			redirect: null
		};

		this.cols = [{
			Header: "ID",
			accessor: "id"
		}, {
			Header: "Title",
			accessor: "title"
		}, {
			Header: "Content",
			accessor: "content"
		}, {
			Header: "Category",
			accessor: "category"
		}, {
			Header: "Tags",
			accessor: "tags"
		}, {
			Header: "Image",
			accessor: "imageFileName"
		}, {
			Header: "Date",
			accessor: "date",
			Cell: (row) => (moment(row.row.date).format("DD.MM.YYYY"))
		}, {
			Header: "Buttons",
			id: "buttons",
			Cell: (row) => (
				<span>
					<Button onClick={() => this.onTableEditButtonClicked(row)}>Edit</Button>
					<span> </span>
					<Button onClick={() => this.onTableDeleteButtonClicked(row)}>Delete</Button>
				</span>
			)
		}];

		this.onTableEditButtonClicked = this.onTableEditButtonClicked.bind(this)
		this.onTableDeleteButtonClicked = this.onTableDeleteButtonClicked.bind(this);
	}

	componentDidMount() {
		Post.listAll().then((posts) => {
			this.setState({ posts: Array.from(posts) });
		});
	}

	onTableEditButtonClicked(row) {
		this.setState({redirect: `/dashboard/edit/${row.row.id}`});
	}

	onTableDeleteButtonClicked(row) {
		console.log(row);
		this.setState({
			selectedRow: row,
			deleteModalIsOpen: true
		});
	}

	onModalDeleteClicked() {
		let id = this.state.selectedRow.row.id;
		Post.deleteById(id).then(() => {
			let newPosts = this.state.posts.filter(post => post.id !== id);
			this.setState({posts: newPosts});
		});
		this.setState({ deleteModalIsOpen: false });
	}

	onModalCancelClicked() {
		this.setState({ deleteModalIsOpen: false });
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect to={this.state.redirect} />);
		}

		return (
			<div className="CreatePostView">
				<DeletePostModal isOpen={this.state.deleteModalIsOpen}
					onDelete={this.onModalDeleteClicked.bind(this)}
					onCancel={this.onModalCancelClicked.bind(this)} />

				<Sidebar />
				<div className="page-content">
					<h1>Data Table</h1>
					<ReactTable data={this.state.posts} columns={this.cols} />
				</div>
			</div>
		);
	}
}

export default CreatePostView;
