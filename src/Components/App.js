import React, { Component } from "react";
import "../App.css";
import base from "./base";
import NovelPicker from "./NovelPicker";
import SearchForm from "./SearchForm";
import Header from "./Header";
import styled from "styled-components";
import ExistingNovels from "./ExistingNovels";

class App extends Component {
  state = {
    novels: {},
    chapters: {},
    novelIndex: {}
  };

  componentDidMount() {
    // const { params } = this.props.match;
    // this.ref = base.syncState(`${params.novelId}`, {
    //   context: this,
    //   state: "novel"
    // });
  }

  componentWillUnmount() {
    // base.removeBinding(this.ref);
  }
  loadNovel = chapter => {
    let title = chapter["name"];
    let data = chapter["data"];
    Promise.all(data).then(d => {
      console.log("data d", d);
      const novels = { ...this.state.novel };
      const novelIndex = { ...this.state.index };
      novels[`${title}${Date.now()}`] = { title: d };
      novelIndex[`${title}${Date.now()}`] = { title, count: d.length };
      this.setState({ novels, novelIndex });
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
          <NovelPicker passDataToState={this.loadNovel} />
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
