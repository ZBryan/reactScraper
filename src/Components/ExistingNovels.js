import React, { Component } from "react";
import styled from "styled-components";

export default class ExistingNovels extends Component {
  state = {
    Novels: {},
    Chapters: {}
  };
  render() {
    const { title, chapters } = this.props.details;
    const chTitle = chapters ? chapters[chapters.length - 1].title : "None";
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <h4>Most recent {chTitle}</h4>
        <StyledButton type="submit">View Novel</StyledButton>
      </React.Fragment>
    );
  }
}

const StyledButton = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
