const React = require('react');
const { useState } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');

  const onChange1 = (e) => {
    setAnswer(e.target.value);
  }
  const onSubmit1 = (e) => {
    e.preventDefault();
    if (parseInt(answer) !== first * second) {
      setAnswer('');
      setResult((prevResult) => {return `${answer}은 정답이 아니다.`});
    } else {  
      setAnswer('');
      setResult((prevResult) => {return `${answer}은 정답이다🎉`});
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
    }
  }

  return (
    <>
      <div>{first} x {second}는 뭘까?</div>
      <form onSubmit={onSubmit1}>
      <input onChange={onChange1} value={answer}/>
      <button type='submit'>입력</button>
      </form>
      <div>{result}</div>

    </>
  )
}

module.exports = GuGuDan