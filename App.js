import React from "react";
import ReactDOM from "react-dom/client"


/*
<div id="parent"> 
    <div id="child">
        <h1>Im h1 </h1>
        <h2>i m h2 </h2>
    </div>
    <div id="child2">
        <h1>Im h1 yo </h1>
        <h2>i m h2 yo </h2>
    </div>

</div>
*/ 

const parent = React.createElement("div",{id :"parent"  },
    [
    React.createElement("div",{id :"child"},
    [
        React.createElement("h1",{},"I am the h1"),
        React.createElement("h2",{},"I am the h2")
    ]
    ),
    React.createElement("div",{id :"child2"},
        [
            React.createElement("h1",{},"I am the h1 yo"),
            React.createElement("h2",{},"I am the h2 yo")
        ]
        )
    ]
)


    

const heading = React.createElement(
    "h1",
    {
    id: "heading" ,
    xyz:"abc" 
     },
    "Hello from React"
    );
    const root = ReactDOM.createRoot(document.getElementById("root"));

    console.log(heading);
    root.render(heading);
    root.render(parent);


    root.render(
        React.createElement(React.Fragment, null, [heading, parent])
    );