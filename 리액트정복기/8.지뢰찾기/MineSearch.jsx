const React = require('react');
const Form = require('./Form');
const Table = require('./Table')
const { useReducer, useMemo, useEffect } = React;
const { TableContext } = require('./Context');
const { START_GAME, OPEN_CELL, CLICK_MINE, TO_FLAG_CELL, TO_QUESTION_CELL, NORMALIZE_CELL, CODE, INCREMENT_TIMER } = require('./Constants');

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

const plantMine = (row, cell, mine) => {
  // 1. 모든 칸의 인덱스가 담긴 배열을 만든다. [줄 수 * 셀 수]
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });

  // 2. 모든 칸의 인덱스가 담긴 배열에서 설정된 지뢰의 개수만큼 뽑아서 새로운 배열에 넣는다[지뢰 칸 인덱스가 담긴 배열 만들기].
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  // 3. 하나의 배열 안에, 칸의 개수만큼 NORMAL CODE로 채워진 row 배열이 있는, 2차원 배열을 만든다.[이때는 지뢰를 고려하지 않는다.] 
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // 4. 2번 과정에서 뽑은 지뢰의 인덱스가 담긴 배열을 for문으로 돌며, 기존 3번 배열에 지뢰를 심는다.
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); // 여기서 유의할 것은, shuffle 속의 인덱스는 '순서 - 1'인 반면, cell은 실제 셀 개수 그대로임.
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  
  // 5. 지뢰와 일반 셀이 섞여 있는 이차원 배열을 반환
  return data;
}

// 인자로 받은 action의 type에 따라 상태값을 바꾸는 동작을 수행하는 함수인 reducer
const reducer = (state, action) => {
  switch (action.type) {
    // 1. action의 type이 START_GAME인 경우, 모든 상태값을 모두 초기값으로 만든다.
    case START_GAME: {
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine), // 위에서 정의한 함수에 의해 만들어지는 이차원 배열
        halted: false,
        timer: 0,
      }
    }
    // 2. action의 type이 OPEN_CELL인 경우, 인자로 넘긴 row, cell 인덱스 값을 받아 해당 칸을 열어준다.
    // * 이때, 각 칸의 CODE가 무엇인지에 따라, 혹은 위치가 어딘지에 따라 다르게 작동한다. [ex. OPENED, FLAG이면 무시 등등] 
    case OPEN_CELL: {
      // 얕은 복사를 통해 tableData를 새로운 객체로 만들어준다. > 불변성 유지
      const tableData = [...state.tableData];
      // 얕은 복사를 통해 모든 row를 새로운 객체로 만들어준다. > 불변성 유지
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = []; // 체크한 칸을 담을 배열 생성
      let openedCount = 0; // 열린 칸의 개수를 담을 셀 변수 생성
      // 2-1. 해당 칸을 열고 그 주위의 칸들을 검사하는 함수
      const checkAround = (row, cell) => {
        // 2-1-1. 무시할 칸들을 걸러냄
        // 존재하지 않는 칸은 무시한다.
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) { 
          return;
        }
        // 이미 열린 칸, 깃발 칸, 물음표 칸은 무시한다.
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        }
        // 이미 체크 완료된 칸일 경우 무시하며, 체크하지 않은 칸일 경우 체크했음을 기록[콜스택 터지는 것을 방지].
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        }
        // 2-1-2. 주위 칸들을 검사
        // 주위 칸들을 모두 담은 배열 만들기
        // 우선 양 옆의 칸을 담은 배열 생성
        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];
        // 윗줄이 존재한다면 바로 윗줄 3칸을 담은 배열 생성 [윗줄이 없을 경우 아래 로직에서 attribute 에러가 발생하므로 if 문으로 검사]
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        }
        // 아랫줄이 존재한다면 바로 아랫줄 3칸을 담은 배열 생성 [아랫줄이 없을 경우 아래 로직에서 attribute가 발생하므로 if 문으로 검사]
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }
        // 2-2. 주위 칸들 중 지뢰가 있는지 검사
        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        if (count === 0) {
          // 만약 주위 칸들 중 지뢰가 하나도 없으면 주위 칸들을 모두 near 배열에 담는다[checkAround 함수에 넣기 위해].
          const near = [
            [row, cell + 1],
            [row, cell - 1],
          ];
          if (row > 0) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          if (row < tableData.length - 1) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        } 
        if (tableData[row][cell] === CODE.NORMAL) {// 이 칸이 닫힌 칸이었을 경우만 카운트 증가[중복 측정을 방지]
          openedCount += 1;
        }
        // 주위 지뢰개수의 합이 해당 셀의 숫자가 된다[이걸로 인해 오픈되는 거] 즉, checkAround를 거치는 셀은 무조건 열림.
        tableData[row][cell] = count;
      }
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case TO_FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case TO_QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    default:
      return state;
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  // 타임 측정
  useEffect(() => {
    if (halted === false ) {
      const timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [halted]);
  
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

  return (
    // context API로 관리하는 데이터에 접근할 컴포넌트들을 provider로 묶어준다.
    // provider로 넘겨주는 값들은 useMemo로 묶어 준다. >> 안 그럼 state 바뀔 때마다 모든 컴포넌트가 리렌더링됨
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

module.exports = {
  MineSearch,
  TableContext,
}