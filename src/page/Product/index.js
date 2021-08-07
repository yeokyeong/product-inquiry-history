import React from "react";
import "./index.scss";
import data from "../../database";

// SessionStorage 또는 LocalStorage

// **2. 상품 조회이력 목록 페이지 (/recentList)**

// - 00시 기준으로 최근 조회이력 초기화

// - (목록 상단) 필터: '브랜드'(전체 및 조회이력에 존재하는 브랜드 목록으로 구성), 다중선택 가능
// - (선택 팝업) 정렬: 최근 조회 순, 낮은 가격 순
// - 상품 클릭 시 '상품상세 페이지'로 이동

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], selectedItem: {} };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    this.setState({ products: [...data] });
  };
  onClickItem = (item) => {
    this.setState({ selectedItem: item }, () => this.pushHistory());
  };

  pushHistory = () => {
    let itemHistories = window.localStorage.getItem("itemHistories");
    if (itemHistories) {
      try {
        itemHistories = this.deleteIfExist(JSON.parse(itemHistories));
      } catch (err) {
        itemHistories = [];
      }
    } else {
      itemHistories = [];
    }

    itemHistories.push({
      item: this.state.selectedItem,
      expire: new Date().toString()
    });

    window.localStorage.setItem("itemHistories", JSON.stringify(itemHistories));
  };

  deleteIfExist = (itemHistories) => {
    const idx = itemHistories.findIndex((obj) =>
      this.isDataEqual(obj.item, this.state.selectedItem)
    );
    if (idx > -1) {
      itemHistories.splice(idx, 1);
    }
    return itemHistories;
  };

  isDataEqual = (obj1 = {}, obj2 = {}) => {
    return (
      obj1.title === obj1.title &&
      obj1.brand === obj2.brand &&
      obj1.price === obj2.price
    );
  };

  onClickRandom = () => {
    const { selectedItem } = this.state;
    let isSelectedItemExist = !!Object.keys(selectedItem).length;
    let copiedProducts = [...data];

    if (isSelectedItemExist) {
      const idx = copiedProducts.findIndex((obj) =>
        this.isDataEqual(obj, selectedItem)
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

  render() {
    const { products, selectedItem } = this.state;
    return (
      <div className="page page--product-list">
        <h3>상품상세</h3>
        <button onClick={this.onClickRandom}>랜덤 상품 보기</button>
        <div>
          {products.map((item, idx) => (
            <div key={idx}>
              <ProductItem
                item={item}
                selectedItem={selectedItem}
                isDataEqual={this.isDataEqual}
              />
              <div onClick={() => this.onClickItem(item)}>상품 상세 보기</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
class ProductItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, selectedItem, isDataEqual } = this.props;
    const { title, brand, price } = item;
    // console.log(111, "item");
    return (
      <div
        className={`product-item product-item__selected--${
          isDataEqual(selectedItem, item) ? "on" : "off"
        }`}
      >
        <div>{title}</div>
        <div>{brand}</div>
        <div>{price}</div>
      </div>
    );
  }
}
