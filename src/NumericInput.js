import React, { Component } from 'react'

export default class NumericInput extends Component {
    constructor(props) {
        super(props);

        // set the default value
        this.state = {
            value: this.props.value
        }
    }

    onChange(e) {
        this.setState(
            {value: e.target.value},
            () => this.props.onChange(this.state.value)
        );
    }

  render() {
    return (
        <div>
            <label htmlFor={this.props.id}>{this.props.label}</label>
            <input
              type="number"
              id={this.props.id}
              step={this.props.step}
              min={this.props.min}
              max={this.props.max}
              value={this.state.value}
              onChange={this.onChange.bind(this)}
            />
        </div>
    )
  }
}
