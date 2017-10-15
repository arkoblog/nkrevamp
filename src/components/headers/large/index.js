import React, { Component } from 'react';
import SideNav from '../../navs/sidenav';
import './styles.scss';


class LargeNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNav: false,
    };

    this.toggleSideNav = this.toggleSideNav.bind(this);
    this.assignClass = this.assignClass.bind(this);
  }

  assignClass() {
    if (this.state.showNav) {
      return 'large-sidebar show ';
    } else {
      return 'large-sidebar ';
    }
  }

  toggleSideNav() {
    const { showNav } = this.state;
    this.setState({
      showNav: !showNav,
    });
  }
  render() {
    const url = `url("${this.props.url}")`;
    const { position } = this.props;
    return (
      <div className={this.state.showNav ? 'wrapper show' : 'wrapper'}>
        <SideNav path={this.props.path} className={this.state.showNav ? 'large-sidebar  show' : 'large-sidebar'} />

        <div className="content ">
          <div className="header " style={{ backgroundImage: url, backgroundPosition: position }}>
            <div className="row-fluid ">

              <div className="container">


                <nav className="navbar large-nav">
                  <div className="row">
                    <div className="span9 col-md-6 col-sm-6 my-auto">
                      <a className="logo" href="/">NILKANTHA MUNICIPALITY</a>
                    </div>
                    <div className="span3 col-md-6 col-sm-6 my-auto">
                      {/*eslint-disable*/}
                      <span onClick={this.toggleSideNav} className={this.state.showNav ? 'large-toggle show' : 'large-toggle'}>
                      <i className={this.state.showNav ? 'fa fa-times' : "fa fa-bars"} aria-hidden="true" />
                      </span>
                      {/* eslint-enable */}
                    </div>
                  </div>
                </nav>

              </div>
            </div>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}


export default LargeNav;
