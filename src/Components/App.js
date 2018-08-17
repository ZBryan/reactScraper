import React, { Component } from "react";
import "../App.css";
import base from "../base";
import NovelPicker from "./NovelPicker";
import SearchForm from "./SearchForm";
import Header from "./Header";
import styled from "styled-components";
import ExistingNovels from "./ExistingNovels";

class App extends Component {
  state = {};

  componentDidMount() {
    // this.ref = base.syncState(`this.props.match`);
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div className="App">
        <Header pageHeading={this.chapter || "Light Novel Web Scraper"} />
        <Div className="search">
          <SearchForm />
        </Div>
        <Div className="getNovel">
          <NovelPicker />
        </Div>
        <ExistingNovels />
      </div>
    );
  }
}

export default App;

// styles

const Div = styled.div`
  margin-top: 20px;
`;
