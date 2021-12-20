const React = require('react');
const { Component } = React;

class ResponseCheck extends Component { 
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.'
      })
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '클릭하세요!'
        })
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000 + 2000)); // 2초 또는 3초
    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
      })
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState((prevState) => ({
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [...prevState.result, this.endTime - this.startTime],
      }))
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  }

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0
    ? <div>아직 측정값이 없습니다.</div>
    : <>
        <div>당신의 평균 반응 속도: {result.reduce((acc, cur)=> acc + cur) / result.length}ms</div>
        <button onClick={this.onReset}>초기화</button>
      </>
  }

  render() {
    const { state, message } = this.state;
    return (
      <>
        <h1>4. 반응 속도</h1>
        <div 
          id='screen'
          className={state}
          onClick={this.onClickScreen}
          >
            {message}
        </div>
        {this.renderAverage()}
        {/* {this.state.result.length === 0 
        ? null
        : <div>평균 시간: {this.state.result.reduce((acc, cur)=> acc + cur) / this.state.result.length}ms</div>
        } */}
      </>
    )
  }
}

module.exports = ResponseCheck