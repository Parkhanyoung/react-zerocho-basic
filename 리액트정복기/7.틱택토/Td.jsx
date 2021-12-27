const React = require('react');
const { useCallback } = React;
const 제발 = require('./TicTacToe');
console.log(제발); 

const Td = ({ dispatch, rowIndex, cellIndex, cellData } ) => {
  
  const onClickTd = useCallback(() => {
    dispatch({ type: 'CLICK_CELL', row: rowIndex, cell: cellIndex });
    dispatch({ type: 'SET_TURN' });
  }, []);

  return (
      <td onClick={onClickTd}>{cellData}</td>
  );
}

module.exports = Td;