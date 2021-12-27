const React = require('react');
const { useEffect, useCallback, useReducer } = React;
const Table = require('./Table');

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['','',''],
    ['','',''],
    ['','','']
  ],
  recentCell: [-1, -1]
};

// action의 이름은 대문자로 하고, 상수로 정의해준다.
const SET_WINNER = 'SET_WINNER';
const CLICK_CELL = 'CLICK_CELL';
const SET_TURN = 'SET_TURN';
const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 얘처럼 state를 직접 바꾸면 안 됨, 내부 값이 바뀌어도 같은 객체로 간주되기 때문
      // state를 바꾸려면 이벤트가 일어날 때 액션을 디스패치해서 바꿔준다.

      // 기존의 state를 스프레드하고, 바뀔 부분만 바꾼다. 바뀔 state를 return문으로 넘겨준다. > 불변성 유지를 위해
      return {
        ...initialState,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 문제를 해결할 수 있다.
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      };
    }
    case SET_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      };
    }
    case RESET_GAME: {
      return {
        ...initialState,
        winner: '무승부!!'
      }
    }
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner, turn, recentCell} = state;

  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: 'SET_WINNER', winner: 'O' });
  }, [])

  
  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
    } else {
      let all = true;
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
            return;
          }
        });
      });
      if (all) {
        dispatch({type: RESET_GAME});
      } else {
        dispatch({type: SET_TURN});
      }
    }
  }, [recentCell])

  return (
    <>
      <h1>7.틱택토</h1>
      <Table dispatch={dispatch} tableData={tableData} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
}

module.exports = TicTacToe;
