import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';
import { HomePage  } from './page/HomePage'
import { PlaylistPage } from './page/PlaylistPage'
import { GenrePage } from './page/GenrePage'
import { MusicianPage } from './page/MusicianPage'
import { SingerPage } from './page/SingerPage'
import { SingerDetailPage } from './page/SingerDetailPage'
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/playlist" component={PlaylistPage} />
                <Route exact path="/genre" component={GenrePage} />
                <Route exact path="/musician" component={MusicianPage} />
                <Route exact path="/singer" component={SingerPage} />
                <Route exact path="/singer/:id" component={SingerDetailPage} />
            </Switch>
            <div className="App"></div>
        </Router >
    );
}

export default App;