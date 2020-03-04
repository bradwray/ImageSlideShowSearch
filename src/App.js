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

  componentDidMount = () => {
    // document.onkeydown = e => {
    //   console.log(e.key);
    //   if (e.key === " ") {
    //     this.toMenu();
    //   }
    //   if (e.key === "a") {
    //     this.keyChange("Alligator");
    //   }
    //   if (e.key === "b") {
    //     this.keyChange("Bull");
    //   }
    //   if (e.key === "c") {
    //     this.keyChange("Camel");
    //   }
    //   if (e.key === "d") {
    //     this.keyChange("Duck");
    //   }
    //   if (e.key === "e") {
    //     this.keyChange("Elephant");
    //   }
    //   if (e.key === "f") {
    //     this.keyChange("Frog");
    //   }
    //   if (e.key === "g") {
    //     this.keyChange("Giraffe");
    //   }
    //   if (e.key === "h") {
    //     this.keyChange("Horse");
    //   }
    //   if (e.key === "i") {
    //     this.keyChange("Iguana");
    //   }
    //   if (e.key === "j") {
    //     this.keyChange("Jaguar");
    //   }
    //   if (e.key === "k") {
    //     this.keyChange("Koala");
    //   }
    //   if (e.key === "l") {
    //     this.keyChange("Lion");
    //   }
    //   if (e.key === "m") {
    //     this.keyChange("Monkey");
    //   }
    //   if (e.key === "n") {
    //     this.keyChange("Newt");
    //   }
    //   if (e.key === "o") {
    //     this.keyChange("Owl");
    //   }
    //   if (e.key === "p") {
    //     this.keyChange("Pig");
    //   }
    //   if (e.key === "q") {
    //     this.keyChange("Quail");
    //   }
    //   if (e.key === "r") {
    //     this.keyChange("Rabbit");
    //   }
    //   if (e.key === "s") {
    //     this.keyChange("Snake");
    //   }
    //   if (e.key === "t") {
    //     this.keyChange("Turtle");
    //   }
    //   if (e.key === "u") {
    //     this.keyChange("Unicorn");
    //   }
    //   if (e.key === "v") {
    //     this.keyChange("Vulture");
    //   }
    //   if (e.key === "w") {
    //     this.keyChange("Wolf");
    //   }
    //   if (e.key === "x") {
    //     this.keyChange("Xylophone");
    //   }
    //   if (e.key === "y") {
    //     this.keyChange("Yak");
    //   }
    //   if (e.key === "z") {
    //     this.keyChange("Zebra");
    //   }
    // };
  };

  toMenu = () => {
    this.setState({
      images: [],
      name: "Pick a letter."
    });
  };

  toggleFull = () => {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  };

  keyChange = val => {
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
              onChange={e => this.keyChange(e.target.value)}
            />
          </div>
          <Slides images={this.state.images} />
        </div>
      </Fullscreen>
    );
  }
}

export default withStyles(styles)(App);
