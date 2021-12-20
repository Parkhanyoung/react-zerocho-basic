const React = require('react');
const { useState, useRef } = React;
const Try = require('./Try');

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [trial, setTrial] = useState(0);
  const [records, setRecords] = useState([]);
  const inputEl = useRef(null);

  const initialize = () => {
    setResult('');
    setValue('');
    setAnswer(getNumbers());
    setTrial(0);
    setRecords([]);
  }
  
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런!');
      setRecords((prevRecords)=>[...prevRecords, {try: value, result: '홈런'}]);
      alert('홈런! 게임 다시 시작한다.');
      initialize();
      inputEl.current.focus();
    } else {
      const answerArray = value.split('').map((v)=>(parseInt(v)));
      let strike = 0;
      let ball = 0;
      if (trial >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였다.`);
        alert('게임 다시 시작한다.');
        initialize();
        inputEl.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
        if (answerArray[i] === answer[i]) {
          strike += 1;
        } else if (answer.includes(answerArray[i])) {
          ball += 1;
        }
      }
      setResult(`${strike} 스트라이크 ${ball} 볼입니다!`);
      setTrial((prevTrial)=>prevTrial+1);
      setRecords((prevRecords)=>
      [...prevRecords, { try: value, result: `${strike}스트라이크 ${ball} 볼`}]
      )
      setValue('');
    }
  }
  };

  return (
    <>
      <h1>3. 숫자 야구</h1>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input maxLength={4} onChange={onChange} value={value} />
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
}

module.exports = NumberBaseball;