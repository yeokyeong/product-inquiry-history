import React from "react";
import "./index.scss";
import data from "../../Utils/database";
import { getItemHistories, setItemHistories } from "../../Utils/localStorage";
import { isDataEqual } from "../../Utils/dataValidation";
import ProductItem from "../../Components/Item";
import { withRouter, Link } from "react-router-dom";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: [] };
  }

  componentDidMount() {
    const params = decodeURI(this.props.match.params.item);
    this.fetchData(params);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.item !== prevProps.match.params.item) {
      this.fetchData(decodeURI(this.props.match.params.item));
    }
  }
  parseParams = (params) => {
    let item;
    try {
      item = JSON.parse(params);
    } catch (error) {
      item = {};
    }
    return item;
  };
  fetchData = (params) => {
    const parsedObj = this.parseParams(params);
    this.setState(
      {
        product: data.find((item) => isDataEqual(item, parsedObj))
      },
      () => {
        this.addHistory();
      }
    );
  };

  onClickRandom = () => {
    const { product } = this.state;
    let filteredProducts = data.filter((item) => !isDataEqual(item, product));
    let randomIdx = Math.floor(Math.random() * filteredProducts.length);

    this.props.history.push(
      `/product/${encodeURI(JSON.stringify(filteredProducts[randomIdx]))}`
    );
  };

  addHistory = () => {
    let itemHistories = getItemHistories();
    itemHistories = this.deleteIfExist(itemHistories);
    itemHistories.push({
      item: this.state.product,
      expire: new Date().toString()
    });

    setItemHistories(itemHistories);
  };

  deleteIfExist = (itemHistories) => {
    const idx = itemHistories.findIndex((obj) =>
      isDataEqual(obj.item, this.state.product)
    );
    if (idx > -1) {
      itemHistories.splice(idx, 1);
    }
    return itemHistories;
  };

  render() {
    const { product } = this.state;
    return (
      <div className="page page--product-list">
        <Link to="/">home</Link>
        <Link to="/recentList">상품이력페이지</Link>

        <h3>상품상세</h3>
        <button onClick={this.onClickRandom}>랜덤 상품 보기</button>
        <div>
          <ProductItem item={product} />
        </div>
      </div>
    );
  }
}
export default withRouter(Product);
