import React, { Component } from "react";
import styled from "styled-components";

class NovelPicker extends Component {
  render() {
    return (
      <Form clasName="novelPicker">
        <Label htmlFor="name">
          <Input type="text" id="name" required placeholder="Novel name" />
          <span>Name to use for novel</span>
        </Label>
        <Label htmlFor="index">
          <Input
            type="text"
            id="index"
            required
            placeholder="Novel index Url"
          />
          <span>Index Url</span>
        </Label>
        <Label htmlFor="base">
          <Input type="text" id="base" required placeholder="Novel base Url" />
          <span>Base Url, what chapters should be appended to</span>
        </Label>

        <Button type="submit">Get Novel</Button>
      </Form>
    );
  }
}

export default NovelPicker;

// styling

const Form = styled.form`
  display: block;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #000;
  background: #ffe;
  border: none;
  border-radius: 3px;
  width: 30rem;
  max-width: 50%;
  display: flex;
  justify-content: flex-start;
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
