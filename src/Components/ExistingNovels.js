import React, { Component } from "react";
import styled from "styled-components";

export default class ExistingNovels extends Component {
  state = {
    Novels: {},
    Chapters: {}
  };
  render() {
    const ln = this.props.details;
    const key = Object.keys(ln).reduce((a, b) => (ln[a] > ln[b] ? a : b));
    const { chapter, title } = ln[key];

    return (
      <React.Fragment>
        <h1>{title}</h1>
        <h4>Most recent {key}</h4>
        <p dangerouslySetInnerHTML={{ __html: chapter }} />
        {/*Remove just for testing*/}
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
