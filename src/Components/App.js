import React, { Component } from "react";
import "../App.css";
import base from "../base";
import NovelPicker from "./NovelPicker";
import SearchForm from "./SearchForm";
import Header from "./Header";
import styled from "styled-components";
import ExistingNovels from "./ExistingNovels";

class App extends Component {
  state = {
    novel: {},
    chapter: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.novelId}`, {
      context: this,
      state: "novel"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  passDataToState = data => {
    Promise.all(data).then(d => {
      console.log("data d", d);
    });
  };
  render() {
    const { params } = this.props.match;

    return (
      <div className="App">
        <Header
          pageHeading={
            params.novelId
              ? params.novelId.replace("-", " ")
              : "Light Novel Web Scraper"
          }
        />
        <Div className="search">
          <SearchForm />
        </Div>
        <Div className="getNovel">
          <NovelPicker passDataToState={this.passDataToState} />
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
