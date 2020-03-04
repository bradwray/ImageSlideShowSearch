import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const styles = {
  tabs: {
    background: "#333",
    height: "120px",
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 1000
  },
  slide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    overflow: [["hidden"], "!important"],
    color: "#fff"
  },
  bg: {
    background: "#444"
  }
};

class Slides extends React.Component {
  state = {
    index: 0
  };

  handleChange = (event, value) => {
    this.setState({
      index: value
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  render() {
    const { index } = this.state;
    console.log(this.props.images);
    let tabStart = index > this.props.images.length - 6 ? 0 : index;
    return (
      <div style={this.props.bg}>
        <BindKeyboardSwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
        >
          {this.props.images.map(pic => (
            <div style={styles.slide}>
              <img
                height={window.screen.height * 0.8}
                src={pic.largeImageURL}
              />
            </div>
          ))}
        </BindKeyboardSwipeableViews>
        <Tabs
          fullWidth
          centered
          value={index}
          onChange={this.handleChange}
          style={styles.tabs}
        >
          {this.props.images.slice(tabStart, tabStart + 12).map((pic, i) => (
            <Tab
              value={tabStart + i}
              icon={<img height="100px" src={pic.webformatURL} />}
            />
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Slides;
