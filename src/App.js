import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import './App.css';
import TableList from './components/TableList'
import ItemDetail from './components/ItemDetail'

function App() {
  return (
    <div className="App">
       {/* <TableList /> */}
       <BrowserRouter>
        <Switch>
            <Route path='/' exact component={TableList} />
            <Route path='/:table_id' component={ItemDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
