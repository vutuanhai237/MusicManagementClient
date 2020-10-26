import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';
import { HomePage  } from './page/HomePage'
import { GenrePage } from './page/GenrePage'
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/genre" component={GenrePage} />
            </Switch>
            <div className="App"></div>
        </Router >
    );
}

export default App;