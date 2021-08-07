import React from "react";
import "./index.scss";
import { isDataEqual } from "../../Utils/dataValidation";

export default class ProductItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, selectedItem } = this.props;
    const { title, brand, price } = item;
    const isCurrentItem = selectedItem
      ? isDataEqual(selectedItem, item)
      : false;
    // console.log(111, isCurrentItem);
    return (
      <div
        className={`product-item product-item__selected--${
          isCurrentItem ? "on" : "off"
        }`}
      >
        <div>{title}</div>
        <div>{brand}</div>
        <div>{price}</div>
      </div>
    );
  }
}
