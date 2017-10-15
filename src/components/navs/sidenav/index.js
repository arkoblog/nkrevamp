import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss'; //eslint-disable-line
import config from '../../root/config';


class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.assignClass = this.assignClass.bind(this);
  }

  assignClass(item) {
    if (this.props.path === item.path) {
      return 'link active';
    } else {
      return 'link';
    }
  }

  render() {
    const { assignClass } = this;
    return (
      <div className={this.props.className}>
        <div className="row-fluid sidenav-container">

          {config.navigation.map((item, i) => {
            const key = i * Math.random();
            return (
              <div key={key}><Link to={item.path} className={assignClass(item)}>{item.label}</Link> <br /></div>//eslint-disable-line
            );
          })}

        </div>
      </div>
    );
  }
}


export default Sidebar;
