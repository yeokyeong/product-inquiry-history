import React from "react";
import "./index.scss";
import data from "../../Utils/database";
import { getItemHistories, setItemHistories } from "../../Utils/localStorage";
import { isDataEqual } from "../../Utils/dataValidation";
import ProductItem from "../../Components/Item";
import { withRouter } from "react-router";
export default withRouter(
  class Product extends React.Component {
    constructor(props) {
      super(props);
      this.state = { product: [] };
    }

    componentDidMount() {
      this.fetchData(this.props.match.params.title);
    }
    fetchData = (title) => {
      this.setState({ product: data.find((item) => item.title === title) });
    };

    onClickRandom = () => {
      const { product } = this.state;
    };

    render() {
      const { product } = this.state;
      return (
        <div className="page page--product-list">
          <h3>상품상세</h3>
          <button onClick={this.onClickRandom}>랜덤 상품 보기</button>
          <div>
            <ProductItem item={product} />
          </div>
        </div>
      );
    }
  }
);
