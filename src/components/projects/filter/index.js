import React, { Component } from 'react';

import SingleSelect from '../../root/dropdown/SingleSelectWV';
import MultiSelect from '../../root/dropdown/MultiSelect';
import config from '../../root/config';

import './styles.scss';


class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        ward: '',
        type: '',
        budget_amount: '',
        category: '',
      },
    };

    this.onChange = this.onChange.bind(this);
    this.assignButtonClass = this.assignButtonClass.bind(this);
    this.assignDivClass = this.assignDivClass.bind(this);
  }

  onChange(value, name) { //eslint-disable-line

    const currentFilters = this.state;
    switch (name) {
      case 'ward':
        currentFilters.filters.ward = value;
        this.setState({
          filters: {
            ward: value, type: currentFilters.filters.type, budget_amount: currentFilters.filters.budget_amount, category: currentFilters.filters.category,
          },
        }, this.props.onChange(currentFilters.filters));
        break;
      case 'type':
        currentFilters.filters.type = value;
        this.setState({
          filters: {
            ward: currentFilters.filters.ward, type: value, budget_amount: currentFilters.filters.budget_amount, category: currentFilters.filters.category,
          },
        }, this.props.onChange(currentFilters.filters));
        break;
      case 'budget_amount':
        currentFilters.filters.budget_amount = value;
        this.setState({
          filters: {
            ward: currentFilters.filters.ward, type: currentFilters.filters.type, budget_amount: value, category: currentFilters.filters.category,
          },
        }, this.props.onChange(currentFilters.filters));
        break;
      case 'category':
        currentFilters.filters.category = value;
        this.setState({
          category: value, //eslint-disable-line
        }, this.props.onChange(currentFilters.filters));
        break;
      default:
        break;
    }
  }


  assignButtonClass(type) {
    switch (type) {
      case 'nav':
        if (this.props.isNavMinimized) {
          return 'btn btn-sm btn-link btn-toggle inline float-right';
        } else {
          return 'btn btn-sm btn-link btn-toggle  inline float-right';
        }
      case 'filters':
        if (this.props.isFilterMinimized) {
          return 'btn btn-sm btn-link btn-toggle inline ';
        } else {
          return 'btn btn-sm btn-link btn-toggle  inline';
        }
      default:
        return null;
    }
  }

  assignDivClass() {//eslint-disable-line

    if (this.props.isFilterMinimized) {
      return 'row bg-2 no-pad anim-height';
    } else {
      return 'row bg-2 no-pad anim-height show';
    }
  }


  render() {
    return (
      <div className={this.assignDivClass()}>
        <div className="col-md-12 ">
          <div className="container">
            <div className="row  pad-t-s bad-b-s">


              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12  mar-t-s mar-b-s">
                    <span className="uppercase">WARD NUMBER</span>
                    <SingleSelect placeholder="All Wards" value={this.state.filters.ward} name="ward" onChange={this.onChange} options={config.wards} />
                  </div>

                  <div className="col-md-12  mar-t-s mar-b-s">
                    <span className="uppercase">PROJECT BUDGET</span>
                    <SingleSelect placeholder="ANy BUDGET" value={this.state.filters.budget_amount} name="budget_amount" onChange={this.onChange} options={config.budgetRange} />

                  </div>

                  <div className="col-md-12  mar-t-s mar-b-s">
                    <span className="uppercase">PROJECT STATUS</span>
                    <SingleSelect placeholder="SHOW ALL PROJECTs" value={this.state.filters.type} name="type" onChange={this.onChange} options={config.projectTypes} />
                  </div>

                  <div className="col-md-12  mar-t-s mar-b-s">
                    <span className="uppercase">PROJECT CATEGORY</span>
                    <MultiSelect name="category" onChange={this.onChange} options={config.categories} />
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default Filter;
