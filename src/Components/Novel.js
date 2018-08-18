import React, { Component, Fragment } from "react";
import Header from "./Header";

export default class Novel extends Component {
  render() {
    const { params } = this.props.match;
    const regex = /-|_/gi;
    return (
      <Fragment>
        <Header
          pageHeading={
            params.novelId ? params.novelId.replace(regex, " ") : "Novel title"
          }
        />
        <div>Novel</div>
      </Fragment>
    );
  }
}
