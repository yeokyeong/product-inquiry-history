import React from "react";
import "./index.scss";
import { getItemHistories } from "../../Utils/localStorage";
import ProductItem from "../../Components/Item";
// - 상품 클릭 시 '상품상세 페이지'로 이동
const SORT = {
  PRICE: "price",
  RECENT: "recent"
};
export default class HistoryList extends React.PureComponent {
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
  render() {
    const { brands, filteredHistories, selectedSort } = this.state;
    return (
      <div className="page page--history-list">
        <h3>history_list</h3>
        <div>brand</div>
        {brands &&
          Object.keys(brands).map((key, idx) => (
            <div key={idx}>
              <div onClick={() => this.onClickBrand(key)}>
                {key} {brands[key] ? "o" : "x"}
              </div>
            </div>
          ))}
        <hr />
        <div>sort by </div>
        <div>
          <div onClick={() => this.onClickSort(SORT.PRICE)}>
            price {selectedSort === SORT.PRICE ? "o" : "x"}
          </div>
          <div onClick={() => this.onClickSort(SORT.RECENT)}>
            recent {selectedSort === SORT.RECENT ? "o" : "x"}
          </div>
        </div>
        <hr />

        {filteredHistories &&
          filteredHistories.map((history, idx) => {
            return (
              <div key={idx}>
                <ProductItem item={history.item} />
                <div>방문시간 :{history.expire}</div>
              </div>
            );
          })}
      </div>
    );
  }
}
