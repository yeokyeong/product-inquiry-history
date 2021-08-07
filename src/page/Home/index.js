import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import data from "../../Utils/database";
import { getItemHistories, setItemHistories } from "../../Utils/localStorage";
import { isDataEqual } from "../../Utils/dataValidation";
import ProductItem from "../../Components/Item";
export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }
  componentDidMount() {
    this.resetItemHistories();
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ products: [...data] });
  };
  onClickItem = (item) => {
    this.setState({ selectedItem: item }, () => this.addHistory(item));
  };

  addHistory = () => {
    let itemHistories = getItemHistories();
    itemHistories = this.deleteIfExist(itemHistories);

    itemHistories.push({
      item: this.state.selectedItem,
      expire: new Date().toString()
    });

    setItemHistories(itemHistories);
  };

  deleteIfExist = (itemHistories) => {
    const idx = itemHistories.findIndex((obj) =>
      isDataEqual(obj.item, this.state.selectedItem)
    );
    if (idx > -1) {
      itemHistories.splice(idx, 1);
    }
    return itemHistories;
  };

  onClickRandom = () => {
    const { selectedItem } = this.state;
    let isSelectedItemExist = !!Object.keys(selectedItem).length;
    let copiedProducts = [...data];

    if (isSelectedItemExist) {
      const idx = copiedProducts.findIndex((obj) =>
        isDataEqual(obj, selectedItem)
      );
      copiedProducts.splice(idx, 1);
    }

    let shuffled = this.shuffleArr(copiedProducts);
    this.setState({ products: shuffled, selectedItem: {} });
  };

  shuffleArr = (arr) => {
    let shuffled = arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled;
  };

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
    const { products } = this.state;

    return (
      <div className="page page--home">
        <Link to="/recentList">상품이력페이지</Link>
        <div className="page page--product-list">
          <h3>상품상세</h3>
          <button onClick={this.onClickRandom}>랜덤 상품 보기</button>
          <div>
            {products.map((item, idx) => (
              <div key={idx}>
                <ProductItem item={item} />
                <div onClick={() => this.onClickItem(item)}>상품 상세 보기</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
