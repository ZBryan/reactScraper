import React, { Component } from "react";
import styled from "styled-components";
import { getLinks } from "../Helpers/indexScraper";
class NovelPicker extends Component {
  novelName = React.createRef();
  indexUrlRef = React.createRef();
  baseRef = React.createRef();

  getIndexLinks = async e => {
    e.preventDefault();
    let name = this.novelName.current.value;
    let indexUrl = this.indexUrlRef.current.value;
    let base = this.baseRef.current.value;
    // console.log(name, indexURl, base);
    let data = await getLinks(indexUrl, base, name, this.props.existing);
    console.log("d", data);
    let chp = { name, data };
    // console.log(chp);
    this.props.passDataToState(chp);
  };

  render() {
    return (
      <Form clasName="novelPicker" onSubmit={this.getIndexLinks}>
        <Label htmlFor="novelName">
          <Input
            type="text"
            id="novelName"
            name="novelName"
            innerRef={this.novelName}
            placeholder="Novel name"
            defaultValue="Peerless Martial God"
          />
          <span>Name to use for novel</span>
        </Label>
        <Label htmlFor="index">
          <Input
            type="text"
            id="index"
            name="index"
            innerRef={this.indexUrlRef}
            placeholder="Novel index Url"
            defaultValue="http://m.wuxiaworld.co/Peerless-Martial-God/all.html"
          />
          <span>Index Url</span>
        </Label>
        <Label htmlFor="base">
          <Input
            type="text"
            id="base"
            name="base"
            innerRef={this.baseRef}
            placeholder="Novel base Url"
            defaultValue={"http://m.wuxiaworld.co/Peerless-Martial-God/"}
          />
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
