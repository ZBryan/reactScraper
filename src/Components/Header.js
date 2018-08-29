import React, { Component } from "react";

export default class Header extends Component {
  render() {
    const { params } = this.props.match;
    const pageHeading = params.novelId
      ? params.novelId.replace("-", " ")
      : "Light Novel Web Scraper";
    return (
      <header className="top">
        <h1>{pageHeading}</h1>
      </header>
    );
  }
}
