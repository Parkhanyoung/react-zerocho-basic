const React = require('react');
const { useState, useCallback, useReducer } = React;
const Table = require('./Table');

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['','',''],['','',''],['','','']]
}

// action의 이름은 대문자로 하고, 보통 상수로 정의해준다.
const SET_WINNER = 'SET_WINNER'


const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 얘처럼 state를 직접 바꾸면 안 됨, 내부 값이 바뀌어도 같은 객체로 간주되기 때문
      // state를 바꾸려면 이벤트가 일어날 때 액션을 디스패치해서 바꿔준다.

      // 기존의 state를 스프레드하고, 바뀔 부분만 바꾼다. 바뀔 state를 return문으로 넘겨준다.
      return {
        ...state,
        winner: action.winner,
      };
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: 'SET_WINNER', winner: 'O' });
  }, [])

  return (
    <>
      <h1>7.틱택토</h1>
      <Table onClick={onClickTable} tableData={state.tableData} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
}

module.exports = TicTacToe;