import React from "react";
import "./index.scss";
import { Container, Button } from "@material-ui/core";
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
      <Container maxWidth="md" className="page page--home">
        <div className="page__header">
          <h3>home</h3>

          <Link to="/recentList">
            <Button variant="contained" color="primary">
              상품이력페이지
            </Button>
          </Link>
        </div>

        <div className="page product--list ">
          {products.map((item, idx) => (
            <div key={idx}>
              <ProductItem item={item} />
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

export default Home;
