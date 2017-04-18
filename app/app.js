import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import routes from './utils/routes';


//ReactDOM.render(<App />, document.getElementById('root'));
injectTapEventPlugin();
const store = configureStore();
render((
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('app'));
