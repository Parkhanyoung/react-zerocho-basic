const React = require('react');
const { useState, useEffect, useRef, useMemo } = React;
const Ball = require('./Ball')

// state와 상관없는 함수는 컴포넌트와 분리하자!
function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), [])
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);
  
  const onClickRedo = () => {
    console.log('onClickRedo');
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }

  useEffect(() => {
      for (let i = 0; i < winNumbers.length - 1; i++) {
        timeouts.current[i] = setTimeout(() => {
          setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
        }, (i + 1) * 1000);
      }
      timeouts.current[6] = setTimeout(() => {
        setBonus(winNumbers[6]);
        setRedo(true);
      }, 7000);
      return () => {
        timeouts.current.forEach((v) => {
          clearTimeout(v);
        });
      }
  }, [timeouts.current]);
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

  return (
    <>
      <h1>6. 로또추첨기</h1>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
}


module.exports = Lotto;
