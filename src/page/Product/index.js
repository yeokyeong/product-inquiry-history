import React from "react";
import "./index.scss";
import { Container, Button } from "@material-ui/core";
import data from "../../Utils/database";
import { getItemHistories, setItemHistories } from "../../Utils/localStorage";
import { isDataEqual } from "../../Utils/dataValidation";
import { withRouter, Link } from "react-router-dom";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: [] };
  }

  componentDidMount() {
    const params = decodeURI(this.props.match.params.item);
    this.fetchData(params);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.item !== prevProps.match.params.item) {
      this.fetchData(decodeURI(this.props.match.params.item));
    }
  }
  parseParams = (params) => {
    let item;
    try {
      item = JSON.parse(params);
    } catch (error) {
      item = {};
    }
    return item;
  };
  fetchData = (params) => {
    const parsedObj = this.parseParams(params);
    this.setState(
      {
        product: data.find((item) => isDataEqual(item, parsedObj))
      },
      () => {
        this.addHistory();
      }
    );
  };

  onClickRandom = () => {
    const { product } = this.state;
    let filteredProducts = data.filter((item) => !isDataEqual(item, product));
    let randomIdx = Math.floor(Math.random() * filteredProducts.length);

    this.props.history.push(
      `/product/${encodeURI(JSON.stringify(filteredProducts[randomIdx]))}`
    );
  };

  addHistory = () => {
    let itemHistories = getItemHistories();
    itemHistories = this.deleteIfExist(itemHistories);
    itemHistories.push({
      item: this.state.product,
      expire: new Date().toString()
    });

    setItemHistories(itemHistories);
  };

  deleteIfExist = (itemHistories) => {
    const idx = itemHistories.findIndex((obj) =>
      isDataEqual(obj.item, this.state.product)
    );
    if (idx > -1) {
      itemHistories.splice(idx, 1);
    }
    return itemHistories;
  };

  render() {
    const { product } = this.state;
    return (
      <Container maxWidth="md" className="page page--product-list">
        <div className="page__header">
          <h3>상품상세페이지</h3>
          <div>
            <Button
              variant="contained"
              color="primary"
              className="header__button"
            >
              <Link to="/">home</Link>
            </Button>

            <Button variant="contained" color="primary">
              <Link to="/recentList">상품이력페이지</Link>
            </Button>
          </div>
        </div>

        <Button
          variant="contained"
          color="default"
          onClick={this.onClickRandom}
        >
          랜덤 상품 보기
        </Button>
        <div className="product--detail">
          <div className="prodct__text title">{product.title}</div>
          <div className="prodct__text brand">{product.brand}</div>
          <div className="prodct__text price">{product.price}</div>
        </div>
      </Container>
    );
  }
}
export default withRouter(Product);
