import React, { Component } from "react";
import "../App.css";
import base from "./base";
import { config } from "dotenv";
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
      const novels = { ...this.state.novels };
      const novelIndex = { ...this.state.novelIndex };
      novels[title] = { title, data: d };
      novelIndex[title] = { title, count: d.length };
      this.setState({ novels, novelIndex });
    });
  };
  render() {
    const { params } = this.props.match;
    console.log("env", process.env.REACT_APP_FIREBASE_DATABASE_URL);

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
        {Object.keys(this.state.novels).map(key => (
          <ExistingNovels key={key} details={this.state.novels[key]} />
        ))}
      </div>
    );
  }
}

export default App;

// styles

const Div = styled.div`
  margin-top: 20px;
`;
