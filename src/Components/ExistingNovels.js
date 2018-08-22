import React, { Component } from "react";

export default class ExistingNovels extends Component {
  render() {
    const { title, data } = this.props.details;

    return (
      <React.Fragment>
        <h1>{title}</h1>
        <h4>Most recent {data[data.length - 1].title}</h4>

        <h4>Available chapters {data.length}</h4>
      </React.Fragment>
    );
  }
}
