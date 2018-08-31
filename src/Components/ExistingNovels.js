import React, { Component } from "react";
import styled from "styled-components";

export default class ExistingNovels extends Component {
  state = {
    Novels: {},
    Chapters: {}
  };
  render() {
    const latestIndex = this.props.details.latest && this.props.details.latest;
    const ln = this.props.details[latestIndex];
    const { title } = ln[ln.length - 1];
    let handleClick = e => {
      e.preventDefault();
      console.log("clicky");
    };
    return (
      <React.Fragment>
        <h1>{title}</h1>

        <form className="novelViewer" onSubmit={handleClick}>
          <StyledButton type="submit">View Novel</StyledButton>
        </form>
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
