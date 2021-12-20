const React = require('react')
const { Component, createRef } = React

const Try = require('./Try')

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    trial: 0,
    records: []
  };

  onChange = (e) => {
    this.setState((prevState) => { return { value: e.target.value } });
                  //== () => {value: e.target.value} >> 화살표 함수에서는 return과 중괄호를 생략할 수 있다.
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState((prevState)=>({
        result: '홈런!',
        records: [...prevState.records, { try: this.state.value, result: '홈런'}]
      }))
      alert('홈런! 게임 다시 시작한다.');
      this.setState({
        result: '',
        value: '',
        answer: getNumbers(),
        trial: 0,
        records: []
      });
      this.inputRef.current.focus();

    } else {
      const answerArray = this.state.value.split('').map((v)=>(parseInt(v)));
      let strike = 0;
      let ball = 0;
      if (this.state.trial >= 9) {
        this.setState(() => ({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였다.`
        }));
        alert('게임 다시 시작한다.');
        this.setState({
          result: '',
          value: '',
          answer: getNumbers(),
          trial: 0,
          records: []
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
        if (answerArray[i] === this.state.answer[i]) {
          strike += 1;
        } else if (this.state.answer.includes(answerArray[i])) {
          ball += 1;
        }
      }
      this.setState((prevState) => ({
        result: `${strike} 스트라이크 ${ball} 볼입니다!`,
        trial: prevState.trial + 1,
        value: '',
        records: [...prevState.records, { try: prevState.value, result: `${strike}스트라이크 ${ball} 볼`}] 
      }))
    }
  }
  };

  inputRef = createRef();

  render() {
    const { result, value, trial, records } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmit}>
          <input ref={this.inputRef} maxLength={4} onChange={this.onChange} value={value} />
          <button>입력</button>
        </form>
        <div>시도: {trial}번</div>
        <ul>
          {records.map((v, i) =>
            <Try key={`${i + 1}차 시도`} value={v} index={i} />)
          }
        </ul>
      </>
    );
  };
}

module.exports = NumberBaseball;