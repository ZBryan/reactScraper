import React, { Component } from "react";

export default class ExistingNovels extends Component {
  render() {
    const { title, chapters } = this.props.details;

    return (
      <React.Fragment>
        <h1>{title}</h1>
        <h4>Most recent {chapters[chapters.length - 1].title}</h4>

        <h4>Available chapters {chapters.length}</h4>
      </React.Fragment>
    );
  }
}
