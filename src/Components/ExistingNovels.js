import React, { Component } from "react";

export default class ExistingNovels extends Component {
  render() {
    const { title, chapters } = this.props.details;
    const chTitle = chapters ? chapters[chapters.length - 1].title : "None";
    const recentI = chapters ? chapters.length : 0;
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <h4>Most recent {chTitle}</h4>
      </React.Fragment>
    );
  }
}
