import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import App from '../components/App';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache()
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Router>
          <Route path="/">
            <App />
          </Route>
        </Router>
      </ApolloProvider>
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div'))
  );
})
