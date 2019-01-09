import React from 'react'; 
import { Input } from 'reactstrap';

export function CategoryInput(props) {
	let categories = props.categories.map(category => <option key={category} value={category}>{category}</option>);

	return (
		<Input name={props.name} type="select" onChange={(e) => props.onChange(e.target.value)} required>
			{categories}
		</Input>
	)
}

export default CategoryInput;