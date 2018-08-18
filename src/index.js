import React from "react";
import { render } from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import NovelPicker from "./Components/NovelPicker";

render(<NovelPicker />, document.getElementById("main"));
registerServiceWorker();
