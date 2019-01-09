import Config from "../config";

const Post = {
	listAll: () => {
		return new Promise((resolve, reject) => {
			fetch(`${Config.API_URL}/posts/`)
				.then((response) => {
					return response.json();
				}).then((json) => {
					resolve(json);
				}).catch(() => {
					reject();
				});
		});
	},

	get: (id) => {
		return new Promise((resolve, reject) => {
			fetch(`${Config.API_URL}/posts/${id}`)
				.then((response) => {
					return response.json();
				}).then((json) => {
					resolve(json);
				}).catch(() => {
					reject();
				});
		});
	},

	create: (post) => {
		return new Promise((resolve, reject) => {
			fetch(`${Config.API_URL}/posts/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(post)
			}).then((response) => {
				return response.json();
			}).then((json) => {
				console.log(json);
				resolve(json);
			}).catch(() => {
				reject();
			});
		});
	},

	update: (post) => {
		return new Promise((resolve, reject) => {
			fetch(`${Config.API_URL}/posts/`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(post)
			}).then((response) => {
				return response.json();
			}).then((json) => {
				console.log(json);
				resolve(json);
			}).catch(() => {
				reject();
			});
		});
	},

	deleteById: (id) => {
		return new Promise((resolve, reject) => {
			fetch(`${Config.API_URL}/posts/${id}`, {
				method: "DELETE"
			}).then((response) => {
				return response.json();
			}).then((json) => {
				resolve(json);
			}).catch(() => {
				reject();
			});
		});
	}
}

export default Post;