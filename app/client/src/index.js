import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import HomePage from './pages/HomePage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        {/* <Route exact
							path="/players"
							render={() => (
								<PlayersPage />
							)}/>
        <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}/> */}
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

