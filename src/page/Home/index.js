import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { getItemHistories, setItemHistories } from "../../Utils/localStorage";
export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.resetItemHistories();
  }

  resetItemHistories() {
    const filtered = getItemHistories().filter(
      (history) =>
        new Date(history.expire).getFullYear() === new Date().getFullYear() &&
        new Date(history.expire).getMonth() === new Date().getMonth() &&
        new Date(history.expire).getDate() === new Date().getDate()
    );
    setItemHistories(filtered);
  }

  render() {
    return (
      <div className="page page--home">
        <Link to="/product">상품페이지</Link>
        <Link to="/recentList">상품이력페이지</Link>
      </div>
    );
  }
}
