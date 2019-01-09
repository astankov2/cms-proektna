import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Posts from '../../api/post';
import PostLink from './PostLink';

export class PostListView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		Posts.listAll().then((posts) => {
			this.setState({ posts });
		});
	}

	render() {
		let postLinks = this.state.posts.map(post => (<li><PostLink key={post.id} post={post} /></li>));
		return (
			<div className="PostListView container">
				<h1>All Posts</h1>
				<ul>
					{postLinks}
				</ul>

				<Link to="/dashboard/">Dashboard</Link>
			</div>
		);
	}
}

export default PostListView;