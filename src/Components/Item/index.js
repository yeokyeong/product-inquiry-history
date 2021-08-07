import React from "react";
import "./index.scss";
import { Button } from "@material-ui/core";
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
      <div className="product-item">
        <div className="product-item__inner">
          <div className="item__text item__text--title">{title}</div>
          <div className="item__text">브랜드 : {brand}</div>
          <div className="item__text">가격 : {price}</div>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => this.onClickItem(item)}
            className="item__button"
          >
            상품 상세 보기
          </Button>
        </div>
      </div>
    );
  }
}
export default withRouter(ProductItem);
