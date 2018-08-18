import React from "react";
import { render } from "react-dom";
import "./index.css";
import Router from "./Components/Router";
import { config } from "dotenv";
import registerServiceWorker from "./registerServiceWorker";
config();

render(<Router />, document.getElementById("main"));
registerServiceWorker();
