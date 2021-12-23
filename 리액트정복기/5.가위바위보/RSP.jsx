const React = require('react');
const { useState, useEffect, useRef } = React;

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState();
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const intervalRef = useRef();

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보)
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위)
    }
  };

  // componentDidMount와 유사한 기능
  useEffect(() => {
    intervalRef.current = setTimeout(changeHand, 1000);
    return () => {
      // componentWillUnmount와 유사한 기능
      clearInterval(intervalRef.current);
    }
  }, [imgCoord]);

  const onClickBtn = (choice) => () => {
    clearInterval(intervalRef.current);
    const myScore = scores[choice]
    const cpuScore = scores[computerChoice(imgCoord)]
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다.');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다.');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      intervalRef.current = setInterval(changeHand, 100);
    }, 1000)
  }

  return (
      <>
        <h1>5. 가위바위보</h1>
        <div id="computer" style ={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className='btn' onClick={onClickBtn('바위')}>바위</button>
          <button id="scissor" className='btn' onClick={onClickBtn('가위')}>가위</button>
          <button id="paper" className='btn' onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
}

module.exports = RSP;