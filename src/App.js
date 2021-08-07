import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Product from "./page/Product";
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
          <Route exact path="/product/:item">
            <Product />
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
