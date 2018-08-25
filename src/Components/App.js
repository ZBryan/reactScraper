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
    const { params } = this.props.match;
    this.ref = base.syncState(`novels`, {
      context: this,
      state: "novels"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  loadNovel = chapter => {
    let novel = chapter["name"];
    let data = chapter["data"];
    for (let index = 0; index < data.length; index += 50) {
      let max = Math.min(data.length + 1, index + 51);
      console.log("max", max);
      const subD = data.slice(index, max);
      Promise.all(subD).then(d => {
        console.log("data d", d);
        const novels = { ...this.state.novels };
        novels[novel] = { chapters: d };
        this.setState({ novels });
      });
    }
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
          <NovelPicker
            passDataToState={this.loadNovel}
            existing={this.state.novels}
          />
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
