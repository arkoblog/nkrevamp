import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import config from '../root/config';
import { fetchBudget, toggleNav, toggleProjectsFilter, fetchComments } from '../../actions';

import SmallHeader from '../headers/small';
import BoxNav from '../navs/boxnav';

import ProjectsMap from './projectsmap';
import Filter from './filter';

import './styles.scss'; //eslint-disable-line


class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectDetails: {},
      projectId: '',
    };
    this.getColors = this.getColors.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onProjectSelect = this.onProjectSelect.bind(this);
    this.afterCommentSubmission = this.afterCommentSubmission.bind(this);
  }

  componentWillMount() {
    this.props.fetchBudget({});
  }

  getColors(data) { //eslint-disable-line
    const catColors = {};
    if (data.length !== 0) {
      data.forEach((category, i) => {
        catColors[category.label] = config.colorScheme[i];
      });
    }

    return catColors;
  }

  afterCommentSubmission(details) {
    console.log('teste', details);


    setTimeout(() => {
      this.props.fetchComments('budgets', details.id);
    }, 2000);
  }

  onChange(filterValues) { //eslint-disable-line
    let cleanFilterValues = filterValues;
    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key] === undefined || filterValues[key] === null || filterValues[key] === '') {
        cleanFilterValues = _.omit(cleanFilterValues, key);
      }
    });
    this.props.fetchBudget(cleanFilterValues);
  }


  onProjectSelect(details) {
    this.props.fetchComments('budgets', details.id);
    this.setState({
      projectId: details.id,
      projectDetails: details,
    });
  }

  render() {
    const { data } = this.props.projects;
    const { isFilterMinimized, isNavMinimized } = this.props.uiState;
    console.log('data', data);
    return (
      <ReactCSSTransitionGroup {...config.transitionOptions}>

        <div>
          <SmallHeader path="/projects">

            <div className="row-fluid h-100 primary">
              <div className="container">
                <div className="col-md-12 ">
                  <div className="row">
                    <BoxNav path="/projects" />
                    <div className="col-md-9  mr-auto ">
                      <div className="bodycontent">
                        <h1 className="title">Learn about our projects</h1>
                        <br />
                        <p>Nilkantha municipality is committed towards enabling a transparent local government for its citizens.</p>
                        <p>
                          In the spirit of this mission, we have put together a map that lets you explore &mdash; and more importantly,
                          provide feedback on &mdash; all projects that are currently underway.
                        </p>
                      </div>
                    </div>


                  </div>

                </div>
              </div>
              <div>

                {data.budgets &&
                <ProjectsMap
                  data={data}
                  onProjectSelect={this.onProjectSelect}
                  projectId={this.state.projectId}
                  colors={this.getColors(data.budgets)}
                  afterCommentSubmission={this.afterCommentSubmission}
                  projectDetails={this.state.projectDetails}
                  comments={this.props.comments}
                >
                  <Filter
                    isNavMinimized={isNavMinimized}
                    isFilterMinimized={isFilterMinimized}
                    onToggleFilter={this.onToggleFilter}
                    onChange={this.onChange}
                  />
                </ProjectsMap>
              }

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
    projects: state.projects,
    comments: state.comments,
  }
);


export default withRouter(connect(mapStateToProps, {
  fetchBudget, toggleNav, toggleProjectsFilter, fetchComments,
})(Projects));
