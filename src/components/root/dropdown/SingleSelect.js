import React, { Component } from 'react';
import Select from 'react-select'; //eslint-disable-line

class SingleSelect extends Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);


    this.state = {

    };
  }


  handleSelectChange(value) {
    // console.log('You\'ve selected:', value);
    this.setState({ value }, this.props.onChange(value, this.props.name));
  }

  render() {
    return (
      <Select
        name={this.props.name}
        className={this.props.className}
        simpleValue
        disabled={this.state.disabled}
        value={this.state.value}
        placeholder={this.props.placeholder}
        delimiter=","
        onChange={this.handleSelectChange}
        options={this.props.options}
      />
    );
  }
}

export default SingleSelect;
