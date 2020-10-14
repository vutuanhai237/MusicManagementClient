import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React  from 'react';
import Home from './page/Home'
import Test from './page/Test'
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />       
                <Route exact path="/test" component={Test} />       
            </Switch>
            
            <div className="App"></div>
        </Router >
    );
}

export default App;