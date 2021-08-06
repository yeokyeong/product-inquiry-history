import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="page--home">
        <Link to="/product">상품페이지</Link>
        <Link to="/recentList">상품이력페이지</Link>
      </div>
    );
  }
}
