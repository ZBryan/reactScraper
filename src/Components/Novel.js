import React, { Component, Fragment } from "react";
import Header from "./Header";

export default class Novel extends Component {
  processChapters = () => {};
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
        <ul>
          <li>
            <a href="" />
          </li>
        </ul>
      </Fragment>
    );
  }
}
