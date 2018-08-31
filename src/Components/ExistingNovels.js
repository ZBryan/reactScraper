import React, { Component } from "react";
import styled from "styled-components";

export default class ExistingNovels extends Component {
  state = {
    Novels: {},
    Chapters: {}
  };
  render() {
    // console.log(this.props.details);
    // const len = this.props.details.length - 1;
    const ln = this.props.details;
    // console.log("length", len);
    // console.log("ln", ln);
    const key = Object.keys(ln).reduce((a, b) => (ln[a] > ln[b] ? a : b));
    const { chapter, title } = ln[key];
    let handleClick = e => {
      e.preventDefault();
      console.log("clicky");
    };
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <h4>Most recent {key}</h4>
        {/* <div
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: chapter }}
        /> */}
        {/*Remove just for testing*/}
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
