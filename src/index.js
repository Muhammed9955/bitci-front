import React from "react";
import ReactDOM from "react-dom";

import "popper.js";
import jquery from "jquery";
import "bootstrap";

import "style/main.styl";
import "style/main.scss";
import "style/main.css";
import App from "components/App";

window.jquery = jquery;

ReactDOM.render(<App />, document.getElementById("root"));
