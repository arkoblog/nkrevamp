import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss'; //eslint-disable-line
import config from '../../root/config';

class BoxNav extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.assignClass = this.assignClass.bind(this);
  }

  assignClass(item) {
    if (this.props.path === item.path) {
      return 'boxnav-link active';
    } else {
      return 'boxnav-link';
    }
  }

  render() {
    const { assignClass } = this;
    return (
      <div className="col-md-3 hidden-md-down boxnav">
        {config.navigation.map((item, i) => {
          const key = i * Math.random();
          /*eslint-disable*/
          return (
            <div key={key} className={assignClass(item)}>
              <Link to={item.path}>{item.label}</Link> <br />
            </div>
          );
          /* eslint-enable */
        })}

        <div className="boxnav-link">
          {/*eslint-disable*/}
          <a href="h.com"><i className="social-media fa fa-facebook" aria-hidden="true" /></a>
          <a href="h.com"><i className="social-media fa fa-twitter" aria-hidden="true" /></a>
          {/* eslint-enable */}
        </div>
      </div>
    );
  }
}


export default BoxNav;
