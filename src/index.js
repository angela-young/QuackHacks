import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import List from "./List.js";
  
var destination = document.querySelector("#container");
  
ReactDOM.render(
    <div>
      <h1>Expiration Date</h1>
        <List/>
    </div>,
    destination
);
