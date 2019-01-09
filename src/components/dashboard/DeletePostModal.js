import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export function DeletePostModal(props) {
	return (<Modal isOpen={props.isOpen}>
		<ModalHeader>Delete Post</ModalHeader>
		<ModalBody>
			Are you sure you want to delete this post?
		</ModalBody>
		<ModalFooter>
			<Button secondary="true" onClick={props.onCancel}>Cancel</Button>
			<Button primary="true" onClick={props.onDelete}>Delete</Button>
		</ModalFooter>
	</Modal>);
}

export default DeletePostModal;