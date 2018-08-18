import React, { Component, Fragment } from "react";
import Header from "./Header";

export default class Chapter extends Component {
  render() {
    const { params } = this.props.match;
    const regex = /-|_/gi;
    return (
      <Fragment>
        <Header
          pageHeading={
            params.chapterId
              ? params.chapterId.replace(regex, " ")
              : "Novel chapter"
          }
        />
        <div>Chapter</div>
      </Fragment>
    );
  }
}
