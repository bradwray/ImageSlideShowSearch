import React, { Component } from "react";
import axios from "axios";
import Slides from "./Slides";
import { withStyles } from "@material-ui/core/styles";
import Fullscreen from "react-full-screen";
import Button from "@material-ui/core/Button";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100vh",
    margin: "-10px",
    background: "#444",
    overflow: [["hidden"], "!important"]
  },
  mat: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  btn: {
    position: "fixed",
    padding: "5px",
    left: 10,
    top: 65,
    color: "#ddd",
    background: "#333",
    height: "70px",
    width: "70px",
    fontFamily: "helvetica",
    fontSize: "40px",
    zIndex: 900
  },
  fullBtn: {
    position: "fixed",
    right: 10,
    top: 10,
    background: "#333",
    height: "70px",
    width: "70px",
    zIndex: 1000
  },
  name: {
    position: "fixed",
    padding: "5px",
    left: 10,
    top: 10,
    color: "#ddd",
    background: "#333",
    height: "50px",
    fontFamily: "helvetica",
    fontSize: "45px",
    zIndex: 1000
  }
});

class App extends Component {
  state = {
    searchText: "",
    name: "Pick a letter.",
    amount: 50,
    apiUrl: "https://pixabay.com/api",
    apiKey: "14987027-7b2498190bc01cf052df9ed8b",
    images: [],
    fulScreen: false
  };

  toggleFull = () => {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  };

  handleChange = val => {
    axios
      .get(
        `${this.state.apiUrl}/?key=${
          this.state.apiKey
        }&q=${val}&image_type=photo&per_page=${
          this.state.amount
        }&safesearch=true`
      )
      .then(async res => {
        this.setState({
          images: res.data.hits,
          name: val
        });
      })
      .catch(err => console.log(err));
  };

  handleCHange = val => {
    console.log(val);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fullscreen enabled={this.state.fullScreen}>
        <div className={classes.root}>
          <Button
            className={classes.fullBtn}
            variant="contained"
            size="large"
            onClick={() => this.toggleFull()}
          >
            <FullscreenIcon className={classes.fullBtnText} />
          </Button>
          <div className={classes.name}>
            <input
              placeholder="Enter your search..."
              onChange={e => this.handleChange(e.target.value)}
            />
          </div>
          <Slides images={this.state.images} />
        </div>
      </Fullscreen>
    );
  }
}

export default withStyles(styles)(App);
