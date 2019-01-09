import React from 'react';
import { Input } from 'reactstrap';

export function HTMLView(props) {
	return (
		<Input type="textarea" col="5" value={props.value} readOnly />
	);
}

export default HTMLView;