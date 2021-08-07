import React from "react";
import "./index.scss";
import { Link, withRouter } from "react-router-dom";
import data from "../../Utils/database";
import { getItemHistories, setItemHistories } from "../../Utils/localStorage";
import ProductItem from "../../Components/Item";
export default withRouter(
  class Home extends React.PureComponent {
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
      this.props.history.push(`/product/${encodeURI(JSON.stringify(item))}`);
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
            <div>
              {products.map((item, idx) => (
                <div key={idx}>
                  <ProductItem item={item} />
                  <div onClick={() => this.onClickItem(item)}>
                    상품 상세 보기
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
);
