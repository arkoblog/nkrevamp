import React, { Component } from 'react';
import _ from 'lodash';
import SideNav from '../../navs/sidenav';
import './styles.scss'; //eslint-disable-line
import config from '../../root/config';

class SamllNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNav: false,
    };

    this.toggleSideNav = this.toggleSideNav.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
  }


  toggleSideNav() {
    const { showNav } = this.state;
    this.setState({
      showNav: !showNav,
    });
  }

  renderDropDown() {
    const selected = _.filter(config.navigation, (o) => {
      return o.path === this.props.path;
    });

    const remaining = _.filter(config.navigation, (o) => {
      return o.path !== this.props.path;
    });

    return (
      <ul className="nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href={selected[0].path} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {selected[0].label}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {remaining.map((item, i) => {
              const key = i;
              return <a key={key} className="dropdown-item" href={item.path}>{item.label}</a>;
            })}
          </div>
        </li>
      </ul>
    );
  }
  render() {
    return (
      <div className={this.state.showNav ? 'small-wrapper show' : 'small-wrapper'}>
        <SideNav path={this.props.path} className={this.state.showNav ? 'small-sidebar  show' : 'small-sidebar'} />

        <div className="content ">


          {/*          <nav className={this.state.showNav ? 'navbar small-nav show fixed-top bg-faded' : 'navbar small-nav fixed-top bg-faded'}>
            <div className="container">

              <a className="small-logo" href="/">NILKANTHA MUNICIPALITY</a>
              {this.renderDropDown()}
              <span onClick={this.toggleSideNav} className={this.state.showNav ? 'small-toggle ml-auto show' : 'small-toggle ml-auto'}>
                <i className={this.state.showNav ? 'fa fa-times' : 'fa fa-bars'} aria-hidden="true" />
              </span>
            </div>
          </nav> */}
          <div className="small-header ">
            <nav className="navbar small-nav fixed-top">

              <div className="container">
                <div className="row">
                  <div className="span9 col-md-6 col-sm-6 my-auto">
                    <a className="logo" href="/">NILKANTHA MUNICIPALITY</a>
                  </div>
                  <div className="span3 col-md-6 col-sm-6 my-auto">
                    {/*eslint-disable*/}
                    <span onClick={this.toggleSideNav} className={this.state.showNav ? 'small-toggle show' : 'small-toggle'}>
                    <i className={this.state.showNav ? 'fa fa-times' : "fa fa-bars"} aria-hidden="true" />
                    </span>
                    {/* eslint-enable */}
                  </div>
                </div>
              </div>
            </nav>
            <div className="row-fluid " />
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}


export default SamllNav;
