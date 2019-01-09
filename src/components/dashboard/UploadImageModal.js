import React from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export function UploadImageModal(props) {
	return (<Modal isOpen={props.isOpen}>
		<ModalHeader>Upload an image</ModalHeader>
		<ModalBody>
			<Label for="file">File: </Label>
			<Input accept=".png, .jpg" name="file" type="file" onChange={props.onFileChanged} />
		</ModalBody>
		<ModalFooter>
			<Button secondary="true" onClick={props.onCancel}>Cancel</Button>
			<Button primary="true" onClick={props.onUpload}>Upload</Button>
		</ModalFooter>
	</Modal>);
}

export default UploadImageModal;