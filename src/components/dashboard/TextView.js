import React, { Component } from 'react';
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.snow.css';

class TextView extends Component {
	constructor(props) {
		super(props);

		this.modules = {
			toolbar: {
				container: [
					[{ 'header': [1, 2, false] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
					['link', 'image'],
					['clean']
				],
				handlers: {
					'image': this.props.onImageButtonClicked
				}
			}
		};
	}

	render() {
		return (
			<ReactQuill
				value={this.props.value}
				onChange={this.props.onChange}
				modules={this.modules} />
		);
	}
}

export default TextView;