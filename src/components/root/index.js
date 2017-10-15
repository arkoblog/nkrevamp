import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import config from './config';

import '../../index.scss';
import '../../index.less';

// import Nav from /'../nav';
import Home from '../home';
import Projects from '../projects';
// import Services from '../services';
// import ServicesDetail from '../servicedetail';
import InMaps from '../inmaps';
// import Resources from '../resources';
// import BasicExample from '../example';
//
ReactGA.initialize('MUHAJAHSG');
const history = createHistory();
history.listen((location, action) => {
  ReactGA.set({ page: location.hash.substring(1) });
  ReactGA.pageview(location.hash.substring(1));
});
//
//
const FallBack = (props) => {
  return (
    <ReactCSSTransitionGroup {...config.transitionOptions}>

      <div className="jumbotron text-center"
        style={{
          margin: '2rem', textTransform: 'uppercase', fontFamily: 'Source Sans Pro, sans-serif', backgroundColor: 'white',
          }}
      >
        <img src="https://www.mycleaningstore.in/media/catalog/product/m/c/mcskfs03_1_.jpg" alt="in progress" style={{ maxHeight: '200px' }} />
        <h1>UNDER CONSTRUCTION</h1>
        <p>Looks like this page is currently not ready. <br /> Please come back at a later time. </p>
      </div>
    </ReactCSSTransitionGroup>
  );
};


class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <HashRouter history={history}>
        <div className="row-fluid no-of no-pad">
          <div className="col-md-12  ">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/inmaps" component={InMaps} />
              <Route component={FallBack} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}


export default Root;
