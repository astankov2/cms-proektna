import React, { Component } from 'react';
import moment from 'moment';

import Config from '../../config';
import Posts from '../../api/post';

export class PostView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {}
		}
	}

	componentDidMount() {
		let postId = this.props.match.params.id;

		Posts.get(postId).then((post) => {
			this.setState({ post });
		});
	}

	render() {
		let formattedDate = moment(this.state.post.date).format("DD.MM.YYYY");
		let imageUrl = `${Config.API_URL}/files/${this.state.post.imageFileName}`;

		return (
			<div className="container">
				<h1>{this.state.post.title}</h1>
				<div><b>Category:</b> {this.state.post.category}</div>
				<div><b>Date:</b> {formattedDate}</div>
				<img src={imageUrl} alt=""/>

				<br />

				<div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
				<div>
					<b>Tags:</b> {this.state.post.tags}
				</div>
			</div>
		);
	}
}

export default PostView;