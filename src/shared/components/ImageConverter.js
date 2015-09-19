import React from "react";
import Dropzone from "react-dropzone-es6"


export default class ImageConverter extends React.Component {
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
        	<div>
        		<Dropzone onDrop={this.onDrop} />
        	</div>
        	);
    }
}