const React = require('react');
const { Component } = React

class Try extends Component {
  render() {
    return (
      <>
        <li>시도한 숫자: {this.props.value.try}</li>
        <li>결과: {this.props.value.result}</li>
        <hr/>
      </>
    )
  }
}

module.exports = Try