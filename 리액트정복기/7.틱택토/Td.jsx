const React = require('react');
const { CLICK_CELL } = require('./TicTacToe');
const ImportedFromTTT = require('./TicTacToe');
const { useCallback, memo } = React;

const Td = ({ dispatch, rowIndex, cellIndex, cellData } ) => {
  console.log('CLICK_CELL??', CLICK_CELL)
  console.log('ImportedFromTTT??', ImportedFromTTT)
  
  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: 'CLICK_CELL', row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
      <td onClick={onClickTd}>{cellData}</td>
  );
}

module.exports = memo(Td);