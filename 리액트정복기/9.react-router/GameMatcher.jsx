const React = require('react');
const { Routes, Route } = require('react-router');
const NumberBaseball = require('../3.숫자야구/NumberBaseball');
const RSP = require('../5.가위바위보/RSP');
const Lotto = require('../6.로또추첨기/Lotto');
const { Component } = React;

class GameMatcher extends Component {
  render() {
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball />
    } else if (this.props.match.params.name === 'rsp') {
      return <RSP />
    } else if (this.props.match.params.name === 'lotto-generator') {
      return <Lotto />
    }
    return (
    <div>
      일치하는 계정이 없습니다.
    </div>
    );
  }
}

module.exports = GameMatcher;