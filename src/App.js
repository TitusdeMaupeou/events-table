import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import DataTable from "./components/DataTable";
import ItemDetail from "./components/ItemDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={DataTable} />
          <Route path="/:table_id" component={ItemDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
