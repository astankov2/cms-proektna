import React from 'react';
import { Input } from 'reactstrap';

export function EditText(props) {
	return (
		<Input type={props.type}
		name={props.name}
		min={props.min}
		max={props.max}
		value={props.value}
		onChange={props.onChange}
		pattern={props.pattern}
		required={props.required}/>
	)
}

export default EditText;