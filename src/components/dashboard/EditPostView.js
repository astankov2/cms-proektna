import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { Collapse, Form, FormGroup, Label, Button } from 'reactstrap';

import Config from "../../config";

import Upload from '../../api/upload';
import Post from "../../api/post";

import EditText from "./EditText";
import SelectBox from "./SelectBox";
import ImageCrop, { getCroppedImg } from './ImageCrop';
import UploadImageModal from "./UploadImageModal";
import TextView from "./TextView";
import CategoryInput from "./CategoryInput";
import HTMLView from "./HTMLView";
import Calendar from 'react-calendar';

export class EditPostView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorValue: "",
			tagSelectValue: [],
			title: "",
			showImageUploadModal: false,
			imageFileName: null,
			imageFile: null,
			imageSrc: "",
			uploadTo: "crop",
			showHTMLView: false,
			category: "Category 1",
			cropImageButtonEnabled: false,
			calendarValue: new Date(),
			crop: null,
			pixelCrop: {},
			redirect: null
		};
	}

	componentDidMount() {
		let postId = this.props.match.params.id;

		Post.get(postId).then((post) => {
			let tags = post.tags.split(" ").map((tag) => ({ label: tag, value: tag }));

			this.setState({
				title: post.title,
				imageSrc: `${Config.API_URL}/files/${post.imageFileName}`,
				imageFileName: post.imageFileName,
				editorValue: post.content,
				calendarValue: new Date(post.date),
				tagSelectValue: tags
			});
		}).catch((error) => {
			console.log(error);
			this.setState({ redirect: "/dashboard/table" });
		});
	}

	onEditPostClicked(e) {
		e.preventDefault();

		if (this.state.title === "" || this.state.editorValue === "" || this.state.category === "") {
			return;
		}

		let post = {
			id: this.props.match.params.id,
			title: this.state.title,
			content: this.state.editorValue,
			category: this.state.category,
			date: this.state.calendarValue.toISOString(),
			tags: this.state.tagSelectValue.map(x => x.value).join(" "),
			imageFileName: this.state.imageFileName
		};

		Post.update(post).then(() => {
			this.setState({ redirect: "/dashboard/table" });
		});
		console.log(post);
	}

	onCropChange(crop, pixelCrop) {
		this.setState({ crop, pixelCrop });
	}

	onUploadImageClicked(e) {
		this.setState({
			uploadTo: "crop",
			showImageUploadModal: true
		});
	}

	onImageUploadModalCancel() {
		this.setState({ showImageUploadModal: false });
	}

	onImageUploadModalUpload() {
		Upload.uploadImage(this.state.imageFile).then((imageFileName) => {
			if (this.state.uploadTo === "crop") {
				this.setState({
					imageFileName,
					imageSrc: `${Config.API_URL}/files/${imageFileName}`
				});
			} else if (this.state.uploadTo === "editor") {
				let text = this.state.editorValue;
				text += `<img src="${Config.API_URL}/files/${imageFileName}" />`
				this.setState({ editorValue: text });
			}
		});
		this.setState({ showImageUploadModal: false });
	}

	onCalendarChange(date) { this.setState({ selectedDate: date }); }
	onEditorChange(value) { this.setState({ editorValue: value }); }
	onCategoryChange(value) { this.setState({ category: value }); }
	onSelectChange(selectedOptions) { this.setState({ tagSelectValue: selectedOptions }); }
	onTitleChange(e) { this.setState({ title: e.target.value }); }

	onImageUploadModalFileChanged(imageFile) {
		this.setState({
			imageFile: imageFile.target.files[0],
			cropImageButtonEnabled: true
		});
	}

	onEditorImageButtonClicked() {
		this.setState({
			showImageUploadModal: true,
			uploadTo: "editor"
		});
	}

	onCropClicked() {
		let image = new Image();
		image.crossOrigin = "anonymous"; // https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
		image.src = this.state.imageSrc;
		image.onload = (() => {
			getCroppedImg(image, this.state.pixelCrop).then((croppedImage) => {
				console.log(croppedImage);
				Upload.uploadImage(croppedImage).then((imageFileName) => {
					this.setState({
						imageSrc: `${Config.API_URL}/files/${imageFileName}`,
						crop: null
					});
				});
			});
		});
	}

	toggleHTMLView() {
		this.setState({ showHTMLView: !this.state.showHTMLView });
	}

	render() {
		const categories = ["Category 1", "Category 2", "Category 3"];
		const tags = ["tag1", "tag2", "tag3"];

		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		return (
			<div className="EditPostView">

				<UploadImageModal isOpen={this.state.showImageUploadModal}
					onCancel={this.onImageUploadModalCancel.bind(this)}
					onUpload={this.onImageUploadModalUpload.bind(this)}
					onFileChanged={this.onImageUploadModalFileChanged.bind(this)} />

				<Sidebar />
				<div className="page-content">
					<h1>Edit Post</h1>

					<Form onSubmit={this.onEditPostClicked.bind(this)}>
						<FormGroup>
							<Label for="title">Title:</Label>
							<EditText name="title" type="text" max="64" value={this.state.title} onChange={this.onTitleChange.bind(this)} required />
						</FormGroup>

						<FormGroup>
							<Label for="category">Category:</Label>
							<CategoryInput name="category" categories={categories} onChange={this.onCategoryChange.bind(this)} />
						</FormGroup>

						<FormGroup>
							<Label for="image">Image:</Label>
							<br />
							<ImageCrop src={this.state.imageSrc} onChange={this.onCropChange.bind(this)} crop={this.state.crop} />
							<br />
							<Button onClick={this.onUploadImageClicked.bind(this)}>Upload Image</Button>
							<span> </span>
							<Button disabled={!this.state.cropImageButtonEnabled} onClick={this.onCropClicked.bind(this)}>Crop</Button>
						</FormGroup>

						<FormGroup>
							<Label for="content">Content:</Label>
							<TextView onImageButtonClicked={this.onEditorImageButtonClicked.bind(this)}
								value={this.state.editorValue}
								onChange={this.onEditorChange.bind(this)} />

							<br />

							<Button onClick={this.toggleHTMLView.bind(this)}>Show HTML</Button>

							<Collapse isOpen={this.state.showHTMLView}>
								<HTMLView value={this.state.editorValue} />
							</Collapse>
						</FormGroup>

						<FormGroup>
							<Label for="date">Date:</Label>
							<Calendar onChange={this.onCalendarChange.bind(this)} value={this.state.calendarValue} />
						</FormGroup>

						<FormGroup>
							<Label for="tags">Tags:</Label>
							<SelectBox items={tags} onChange={this.onSelectChange.bind(this)} value={this.state.tagSelectValue} />
						</FormGroup>

						<Button type="submit" primary="true">Edit Post</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default EditPostView;