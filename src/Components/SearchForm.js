import React, { Component } from "react";
import styled from "styled-components";

class SearchForm extends Component {
  render() {
    return (
      <Form>
        <Label htmlFor="search">
          <Input type="text" id="search" />
          <span className="search">Search for novels by title</span>
        </Label>
        <Button type="submit">Search for novel</Button>
      </Form>
    );
  }
}

export default SearchForm;

// styling for component
const Form = styled.form`
  width: 100%;
  display: flex;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #000;
  background: #ffe;
  border: none;
  border-radius: 3px;
  width: 10rem;
  max-width: 100%;
  display: flex;
  justify-content: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
