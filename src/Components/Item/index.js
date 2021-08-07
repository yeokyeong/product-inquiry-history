import React from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
  }
  onClickItem = (item) => {
    this.props.history.push(`/product/${encodeURI(JSON.stringify(item))}`);
  };

  render() {
    const { item } = this.props;
    const { title, brand, price } = item;
    return (
      <div className={`product-item`}>
        <div>{title}</div>
        <div>{brand}</div>
        <div>{price}</div>
        <div onClick={() => this.onClickItem(item)}>상품 상세 보기</div>
      </div>
    );
  }
}
export default withRouter(ProductItem);
