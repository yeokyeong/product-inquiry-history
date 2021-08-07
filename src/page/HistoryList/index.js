import React from "react";
import "./index.scss";
import { getItemHistories } from "../../Utils/localStorage";
import ProductItem from "../../Components/Item";
// **2. 상품 조회이력 목록 페이지 (/recentList)**

// - 00시 기준으로 최근 조회이력 초기화 -> home || this page ?

// - (선택 팝업) 정렬: 최근 조회 순, 낮은 가격 순
// - 상품 클릭 시 '상품상세 페이지'로 이동
export default class HistoryList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { histories: [], filteredHistories: [], brands: {} };
  }
  componentDidMount() {
    this.setState(
      { histories: getItemHistories(), filteredHistories: getItemHistories() },
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
  render() {
    const { brands, filteredHistories } = this.state;
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
        {filteredHistories &&
          filteredHistories.map((history, idx) => (
            <div key={idx}>
              <ProductItem item={history.item} />
              <div>방문시간 :{history.expire}</div>
            </div>
          ))}
      </div>
    );
  }
}
