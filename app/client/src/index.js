import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { Provider } from 'react-globally'

import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults'
import Signup from './pages/Signup'
import Login from './pages/Login'
import RestDetails from 'pages/RestDetails';
import Health from 'pages/Health'
import Explore from 'pages/Explore';
import ExploreResults from 'pages/ExploreResults';
import ScrollToTop from 'helpers/ScrollToTop';
import Collections from 'pages/Collections'
import About from 'pages/AboutUs'

const initialState = {
	authenticated: false,
	prefer_health: 1,
	userId: "",
	username: "",
}

ReactDOM.render(
  <Provider globalState={initialState}>
  <div>
    <Router>
		<ScrollToTop>
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
        <Route exact
							path="/signup"
							render={() => (
								<Signup />
							)}/>
		<Route exact
							path="/login"
							render={() => (
								<Login />
							)}/>
		<Route exact
							path="/restaurant"
							render={() => (
								<RestDetails />
							)}/>
		<Route exact
							path="/health"
							render={() => (
								<Health />
							)}/>
		<Route exact
							path="/explore"
							render={() => (
								<Explore />
							)}/>
		<Route 
							path="/explore/"
							render={() => (
								<ExploreResults />
							)}/>
		<Route exact
							path="/collection"
							render={() => (
								<Collections />
							)}/>
		<Route exact
							path="/about"
							render={() => (
								<About />
							)}/>
      </Switch>
	  </ScrollToTop>
    </Router>
  </div>
  </Provider>,
  document.getElementById('root')
);

