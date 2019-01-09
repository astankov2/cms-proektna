import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

export function SelectBox(props) {
	let options = props.items.map((item) => ({ value: item, label: item }));

	return (
		<CreatableSelect
			value={props.value}
			onChange={props.onChange}
			options={options}
			isMulti={true}
		/>
	);
}

export default SelectBox;