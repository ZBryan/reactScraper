import React from "react";
import { render } from "react-dom";
import "./index.css";
import Router from "./Components/Router";

import registerServiceWorker from "./registerServiceWorker";

render(<Router />, document.getElementById("main"));
registerServiceWorker();
