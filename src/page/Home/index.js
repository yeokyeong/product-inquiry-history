import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import data from "../../Utils/database";
import { getItemHistories, setItemHistories } from "../../Utils/localStorage";
import ProductItem from "../../Components/Item";
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
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
