import React from 'react';
import { Link } from 'react-router-dom';

export function PostLink(props) {
	let link = `/posts/${props.post.id}`;
	return (
		<Link to={link}>
			{props.post.title}
		</Link>
	);
}

export default PostLink;