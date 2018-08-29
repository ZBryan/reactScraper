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
    novelsIndex: {}
  };
  componentDidMount() {
    this.nRef = base.syncState(`novels`, {
      context: this,
      state: "novels"
    });
    this.iRef = base.syncState(`novelsIndex`, {
      context: this,
      state: "novelsIndex"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.nRef);
    base.removeBinding(this.iRef);
  }

  loadNovel = datas => {
    let novel = datas["name"];
    let data = datas["data"];
    for (let indx = 0; indx < data.length; indx += chunkSize) {
      let max = Math.min(data.length + 1, indx + chunkSize);
      console.log("max", max);
      const subD = data.slice(indx, max);
      Promise.all(subD).then(d => {
        console.log("data d", d);
        console.log("indx", indx);
        let merged = Object.assign(...d);
        console.log("merged", merged);
        const novels = { ...this.state.novels };
        // const novelsIndex = { ...this.state.novelsIndex };

        // let lnIndx = d.map(a => {
        //   a.index, a.title;
        // });
        // if (ln) {
        //   ln.chapters.push(...d);
        //   novelsIndex[novel];
        //   ln.chapters.sort((a, b) => {
        //     return a.index - b.index;
        //   });
        // } else {
        novels[novel] = merged;
        // novelsIndex[novel] = lnIndx;
        // }
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
const chunkSize = 50;
