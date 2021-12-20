const React = require('react');
const { useState, useRef } = React;

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭하여 시작하세요.');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('클릭하세요!');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000 + 2000)); // 2초 또는 3초
    } else if (state === 'ready') {
      clearTimeout(timeout);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭하여 시작하세요.');
      setResult((prevResult)=>[...prevResult, endTime.current - startTime.current]);
    }
  };

  const onReset = () => {
    setResult([]);
  }

  const renderAverage = () => {
    return result.length === 0
    ? <div>아직 측정값이 없습니다.</div>
    : <>
        <div>당신의 평균 반응 속도: {result.reduce((acc, cur)=> acc + cur) / result.length}ms</div>
        <button onClick={onReset}>초기화</button>
      </>
  }

  return (
      <>
        <h1>4. 반응 속도</h1>
        <div 
          id='screen'
          className={state}
          onClick={onClickScreen}
          >
            {message}
        </div>
        {renderAverage()}
        {/* {this.state.result.length === 0 
        ? null
        : <div>평균 시간: {this.state.result.reduce((acc, cur)=> acc + cur) / this.state.result.length}ms</div>
        } */}
      </>
    )
}


module.exports = ResponseCheck