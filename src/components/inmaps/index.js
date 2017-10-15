import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import config from '../root/config';
import { toggleNav, loadMapData } from '../../actions';

import SmallHeader from '../headers/small';
import BoxNav from '../navs/boxnav';
import InMapsMap from './inmapsmap';


import './styles.scss'; //eslint-disable-line


class InMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'education',
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onToggleNav = this.onToggleNav.bind(this);
  }

  componentWillMount() {
    this.props.loadMapData({ type: 'education' });
  }

  componentDidUpdate() {
  }

  onToggleNav() {
    this.props.toggleNav();
  }

  onFilterChange(e) {
    this.setState({
      type: e.target.value,
    }, this.props.loadMapData({ type: e.target.value }));
  }


  render() {
    return (
      <ReactCSSTransitionGroup {...config.transitionOptions}>

        <div>
          <SmallHeader path="/inmaps" >

            <div className="row-fluid h-100 primary">
              <div className="container">
                <div className="col-md-12 ">
                  <div className="row">
                    <BoxNav path="/inmaps" />
                    <div className="col-md-9  mr-auto ">
                      <div className="bodycontent">
                        <h1 className="title">Explore the city of Nilkantha</h1>
                        <br />
                        <p>Do you know where the closest hospital is from your home? Do you know where you can easily access cash during an emergency situation?</p>
                        <p>To help you answer these questions and more, we have put together a detailed map of Nilkantha. Hope you like it.</p>
                      </div>
                    </div>


                  </div>

                </div>
              </div>
              <div>
                <InMapsMap onFilterChange={this.onFilterChange} data={this.props.inMaps.data} type={this.state.type} isNavMinimized={this.props.uiState.isNavMinimized} />

              </div>
            </div>


          </SmallHeader>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}


const mapStateToProps = state => (
  {
    uiState: state.uiState,
    inMaps: state.inMaps,
  }
);

export default withRouter(connect(mapStateToProps, { toggleNav, loadMapData })(InMaps));
