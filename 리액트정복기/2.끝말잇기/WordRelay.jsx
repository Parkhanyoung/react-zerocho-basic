const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('박한영');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (word[word.length-1] === answer[0]) {
      setWord(()=>{return answer});
      setAnswer(()=>{return ''});
      setResult(()=>{return '딩동댕 🎉'});
      inputRef.current.focus() // hooks에서는 ref에 current를 항상 붙여줘야 함
    } else {
      setAnswer(()=>{return ''});
      setResult(()=>{return '땡!!'});
      inputRef.current.focus()
    }
  }

  const onChange = (e) => {
    setAnswer(()=>{return e.target.value});
  }


  return (
      <div>
        <p>{word}</p>
        <form onSubmit={onSubmit}>
        <input ref={inputRef} value={answer} onChange={onChange} />
        <button type="submit">입력!</button>
        </form>
        <p>{result}</p>
      </div>
    );
  }


module.exports = WordRelay;