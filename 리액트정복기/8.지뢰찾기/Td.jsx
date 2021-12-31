const React = require('react');
const { useContext, useCallback, memo, useMemo } = React;
const { TableContext } = require('./Context');
const { CODE, OPEN_CELL, CLICK_MINE, TO_FLAG_CELL, TO_QUESTION_CELL, NORMALIZE_CELL } = require('./Constants');

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444'
      }
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white'
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red'
      }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow'
      }
    default:
      return {
        background: 'white'
      }
  }
}

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
}

const Td = ({rowIndex, cellIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex});
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted])

  const onRightClickTd = useCallback((e) => {
    e.preventDefault();
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: TO_FLAG_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: TO_QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;

    }
  }, [tableData[rowIndex][cellIndex], halted]);

  // useMemo를 사용하여 컴포넌트가 불필요하게 리렌더링되는 것을 막는다.
  // * 이렇게 하면, useContext로 인해 컴포넌트 함수는 실행되지만 아래의 렌더 부분이 재실행되지는 않는다.
  return useMemo(() => 
  <td
    style={getTdStyle(tableData[rowIndex][cellIndex])}
    onClick={onClickTd}
    onContextMenu={onRightClickTd}
  >{getTdText(tableData[rowIndex][cellIndex])}</td>
  , [tableData[rowIndex][cellIndex]]);
};

module.exports = memo(Td);