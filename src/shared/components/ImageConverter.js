import React from "react";
import Dropzone from "react-dropzone-es6"


class ImageConverter extends React.Component {
	onDrop(files) {
	     
	    console.log('Received files: ', files);
	}

	componentWillMount() {
		console.log("server");
	}

	componentDidMount() {
	}

    render() {
        return (
        	<div className="mui-container">
				<div className="mui-ro">
					<h1>{ImageConverter.toolTitle}</h1>
					<p>{ImageConverter.toolDescription}</p>
				</div>
        		<Dropzone onDrop={this.onDrop} />
        	</div>
        	);
    }
}


ImageConverter.toolTitle = "ImageConverter calculator";
ImageConverter.toolDescription =  "The body mass index is a value based on an indviduals weight and height";
ImageConverter.toolMetaDescription = "TODO"

module.exports = ImageConverter;