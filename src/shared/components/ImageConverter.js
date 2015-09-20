import React from "react";
import Dropzone from "react-dropzone-es6"

export default class ImageConverter extends React.Component {
	componentWillMount() {
	}
	componentDidMount() {
	}

    render() {
        return (
        	<div>
        		<DropZone />
        	</div>
        	);
    }
}

class DropZone extends React.Component {
	constructor() {
		super();
		this.state = {
			files: []
		};
		this.onDrop = this.onDrop.bind(this);
		this.onConvertClick = this.onConvertClick.bind(this);
	}

	onDrop(files) {
		this.setState({
			files: files
		});
	}

	onConvertClick() {
		console.log("lol");

		var file = this.state.files[0];

		console.log("file", file);
		console.log("type: ", Object.prototype.toString.call(file));

		var canvasImg = convertImageToPng(file)

		console.log("canvas ", canvasImg)
		this.setState({
			files: [canvasImg]
		});


	}

	render() {
		console.log("Files in render: ", this.state.files);
		return (
			<div>
				<Dropzone ref="dropzone" onDrop={this.onDrop}>
					<div>Drop your image here or click to select image to convert.</div>
				</Dropzone>
				<button type="button" onClick={this.onConvertClick}>
					Convert!
				</button>

				{this.state.files.length > 0 ? <div>
					<h2>Uploading {this.state.files.length} files...</h2>
					<div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
				</div> : null}

				<canvas id="testCan"></canvas>

				<img src={this.state.files[0]} alt=""/>


			</div>
		);
	}
}

function convertImageToPng(file) {
	return convertCanvasToPng(convertImageToCanvas(file));
}

function convertImageToCanvas(file) {
	//var canvas = document.createElement("canvas");

	var canvas = document.getElementById("testCan");

	console.log("CANVAS: ", canvas);

	var ctx = canvas.getContext("2d");

	var img = new Image();
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
	}
	img.src = URL.createObjectURL(file);



	//console.log("url: ", img.src);
	//console.log("img", img);

	canvas.width = img.width;
	canvas.height = img.height;
	//console.log("width: ", img.width);
	//console.log("height: ", img.height);
	//canvas.getContext("2d").drawImage(img, 0, 0);
	//console.log("canvas", canvas);
	//console.log("ctx: ", ctx);


	return canvas;
}

function convertCanvasToPng(canvas) {
	console.log("CNNNAvas: ", canvas);
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	console.log("immmmmage;: ", image);
	return image;
}

// Just dumping this here...
function handleFiles(e) {
	var ctx = document.getElementById('canvas').getContext('2d');
	var reader = new FileReader;
	reader.onload = function(event) {
		var img = new Image;
		img.src = event.target.result;
		img.onload = function() {
			ctx.drawImage(img, 20,20);
		}
	}
	reader.readAsDataURL(e.target.files[0]);
}

var input = document.getElementById('input');
input.addEventListener('change', handleFiles);