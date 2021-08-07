import React from "react";
import "./index.scss";

export default class ProductItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { item } = this.props;
    const { title, brand, price } = item;
    return (
      <div className={`product-item`}>
        <div>{title}</div>
        <div>{brand}</div>
        <div>{price}</div>
      </div>
    );
  }
}
