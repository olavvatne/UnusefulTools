import React from "react";

class HelloWorld extends React.Component {

    render() {
        return (
            <div>
                <div className="mui-ro">
                    <h1>{HelloWorld.toolTitle}</h1>
                    <p>{HelloWorld.toolDescription}</p>
                </div>
                Hello World
            </div>
        );
    }
}


HelloWorld.toolTitle = "HelloWorld calculator";
HelloWorld.toolDescription=  "The body mass index is a value based on an indviduals weight and height";

module.exports = HelloWorld;