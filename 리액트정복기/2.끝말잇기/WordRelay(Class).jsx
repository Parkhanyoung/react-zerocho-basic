const React = require('react');
const { Component } = React

class WordRelay extends Component {
  state = {
    word: '박한영',
    answer: '',
    result: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    const word = this.state.word
    if (word[word.length-1] === this.state.answer[0]) {
      this.setState((prevState) => {
        return {
          word: prevState.answer,
          answer: '',
          result:'딩동댕'}
        });
    } else {
      this.setState((prevState) => {
        return {
          answer: '',
          result:'땡'}
        });
      this.input.focus();
    }
  }

  onChange = (e) => {
    this.setState({answer: e.target.value});
  }

  onRefInput = (i) => {this.input = i};

  render() {
    return (
      <div>
        <p>{this.state.word}</p>
        <form onSubmit={this.onSubmit}>
        <input ref={this.onRefInput} value={this.state.answer} onChange={this.onChange} />
        <button type="submit">입력!</button>
        </form>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

module.exports = WordRelay;