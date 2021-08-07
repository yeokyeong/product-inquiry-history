import React from "react";
import "./index.scss";
import { Container, Button } from "@material-ui/core";
import { getItemHistories } from "../../Utils/localStorage";
import ProductItem from "../../Components/Item";
import { Link } from "react-router-dom";

const SORT = {
  PRICE: "price",
  RECENT: "recent"
};
class HistoryList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      histories: [],
      filteredHistories: [],
      brands: {},
      selectedSort: SORT.RECENT
    };
  }
  componentDidMount() {
    this.setState(
      {
        histories: getItemHistories().reverse(),
        filteredHistories: getItemHistories().reverse()
      },
      () => {
        this.setBrandList();
      }
    );
  }

  setBrandList = () => {
    let filteredBrands = {};
    const brands = this.state.histories.map((history, idx) => {
      return history.item.brand;
    });

    new Set(brands).forEach((item) => {
      filteredBrands[item] = true;
    });

    this.setState({ brands: filteredBrands });
  };

  onClickBrand = (brand) => {
    this.setState(
      (prev) => {
        return { brands: { ...prev.brands, [brand]: !prev.brands[brand] } };
      },
      () => {
        this.filterData();
      }
    );
  };
  filterData = () => {
    const { histories, brands } = this.state;
    const filteredBrands = Object.keys(brands).filter((key) => brands[key]);
    const filteredData = histories.filter((history) => {
      return filteredBrands.includes(history.item.brand);
    });
    this.setState({ filteredHistories: filteredData });
  };

  onClickSort = (selected) => {
    this.setState({ selectedSort: selected }, () => this.sortData());
  };
  sortData = () => {
    const { filteredHistories, selectedSort } = this.state;
    let filteredData;

    if (selectedSort === SORT.PRICE) {
      filteredData = filteredHistories.sort((a, b) => {
        return a.item.price - b.item.price;
      });
    } else {
      filteredData = filteredHistories.sort((a, b) => {
        return new Date(b.expire) - new Date(a.expire);
      });
    }
    this.setState({ filteredHistories: [...filteredData] });
  };
  formatdate = (date) => {
    const expire = new Date(date);
    return `${expire.getFullYear()}-${
      expire.getMonth() + 1
    }-${expire.getDate()} ${
      expire.getHours() < 10 ? `0${expire.getHours()}` : expire.getHours()
    }:${
      expire.getMinutes() < 10 ? `0${expire.getMinutes()}` : expire.getMinutes()
    }:${
      expire.getSeconds() < 10 ? `0${expire.getSeconds()}` : expire.getSeconds()
    }`;
  };
  render() {
    const { brands, filteredHistories, selectedSort } = this.state;
    return (
      <Container maxWidth="md" className="page page--history-list">
        <div className="page__header">
          <h3>상품이력페이지</h3>
          <Button variant="contained" color="primary">
            <Link to="/">home</Link>
          </Button>
        </div>
        <div className="options">
          <span>brand</span>
          <div className="options__list">
            {brands &&
              Object.keys(brands).map((key, idx) => (
                <div
                  className={`option__item option__item--${
                    brands[key] ? "on" : "off"
                  }`}
                  key={idx}
                >
                  <div onClick={() => this.onClickBrand(key)}>{key}</div>
                </div>
              ))}
          </div>
        </div>

        <hr />
        <div className="options">
          <span>sort by </span>
          <div className="options__list">
            <div
              className={`option__item option__item--${
                selectedSort === SORT.PRICE ? "on" : "off"
              }`}
              onClick={() => this.onClickSort(SORT.PRICE)}
            >
              price
            </div>
            <div
              className={`option__item option__item--${
                selectedSort === SORT.RECENT ? "on" : "off"
              }`}
              onClick={() => this.onClickSort(SORT.RECENT)}
            >
              recent
            </div>
          </div>
        </div>
        <hr />
        <div className="product--list">
          {filteredHistories &&
            filteredHistories.map((history, idx) => {
              return (
                <div className="product--wrapper" key={idx}>
                  <ProductItem item={history.item} />
                  <span className="product__expire">
                    방문시간:{this.formatdate(history.expire)}
                  </span>
                </div>
              );
            })}
        </div>
      </Container>
    );
  }
}

export default HistoryList;
