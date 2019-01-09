import Config from "../config";

const Upload = {
	uploadImage: (image) => {
		console.log(image);
		let formData = new FormData();
		formData.append("file", image);

		return new Promise((resolve, reject) => {
			fetch(`${Config.API_URL}/files/upload`, {
				method: "POST",
				body: formData
			}).then((response) => {
				return response.text();
			}).then((text) => {
				console.log(text);
				resolve(text);
			}).catch(() => {
				reject();
			});
		});
	}
}

export default Upload;