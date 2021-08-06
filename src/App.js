import "./App.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProductList from "./page/ProductList";
import HistoryList from "./page/HistoryList";
import Home from "./page/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/product">
            <ProductList />
          </Route>
          <Route exact path="/recentList">
            <HistoryList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
