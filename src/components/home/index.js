import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import config from '../root/config';

import LargeHeader from '../headers/large';
import BoxNav from '../navs/boxnav';

import './styles.scss'; //eslint-disable-line


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <ReactCSSTransitionGroup {...config.transitionOptions}>

        <div>
          <LargeHeader path="/" >

            <div className="row-fluid h-100 primary">
              <div className="container">
                <div className="col-md-12 ">
                  <div className="row">
                    <BoxNav path="/" />
                    <div className="col-md-9  mr-auto ">
                      <div className="bodycontent">
                        <h1 className="title">Connecting you to your local government.</h1>
                        <br />
                        <p>Welcome to nilkantha.gov, the best place for you to find out about government services and information for the municipality of Nilkantha, Nepal.</p>
                        <p>You can start by <span className="underline"> <a href="/projects">exploring our current projects</a></span>
                      , or learning more about the <span className="underline"><a href="/services">services we provide</a></span>.
                      Browse through <span className="underline"><a href="/resources">notices and announcements</a></span>,
                      or <span className="underline"><a href="/inmaps">explore the municipality of Nilkantha through maps</a></span>.
                        </p>
                      </div>
                    </div>


                  </div>

                </div>
              </div>

            </div>


          </LargeHeader>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}


export default Home;
