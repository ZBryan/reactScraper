import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Novel from "./Novel";
import NotFound from "./NotFound";
import Chapter from "./Chapter";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={App} />
      <Route exact path={"/:novelId"} component={Novel} />
      <Route exact path={"/:novelId/:chapterId/"} component={Chapter} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
