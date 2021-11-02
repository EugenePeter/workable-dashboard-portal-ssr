import React from "react";

class Test extends React.Component {
  static async getInitialProps({ req, res, match }) {
    // const hn = await fetch('http://demo.wp-api.org/wp-json/wp/v2/posts/');
    const stuff = "hello";
    console.log("im dagan,", req);
    return { stuff };
  }

  render() {
    return (
      <div className="dark">
        <h1>THIS IS A TEST</h1>;<h2>{this.props}</h2>
      </div>
    );
  }
}

export default Test;
