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
import SearchResults from './pages/SearchResults'

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route
							path="/search"
							render={() => (
								<SearchResults/>
							)}/>
        {/* <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}/> */}
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

