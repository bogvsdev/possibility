import React from "react";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
        <div>
          <h1>Ask for possibility</h1>
          <form action="#" method="post" id="f">
            <div className="row">
              <input type="text" name="qu" id="qu" />
            </div>
            <div className="row">
              <input type="submit" id="btn" value="Check it out" />
            </div>
          </form>

          <div id="result">
            <h2>Possibility is </h2>
            <h2 className="percent">
              <span>0%</span>
              <div className="liquid"></div>
            </h2>
          </div>
        </div>
    );
  }
}