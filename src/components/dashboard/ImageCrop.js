import React from 'react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

// https://www.npmjs.com/package/react-image-crop#usage
export function getCroppedImg(image, pixelCrop, fileName = "image.png") {

	const canvas = document.createElement('canvas');
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;
	const ctx = canvas.getContext('2d');

	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	// As Base64 string
	//const base64Image = canvas.toDataURL('image/jpeg');

	return new Promise((resolve, reject) => {
		canvas.toBlob(blob => {
			blob.name = fileName;
			resolve(blob);
		}, 'image/png');
	});
}

export function ImageCrop(props) {
	return (
		<ReactCrop src={props.src} onChange={props.onChange} crop={props.crop} />
	)
}

export default ImageCrop;