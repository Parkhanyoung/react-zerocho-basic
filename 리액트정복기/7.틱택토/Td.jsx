const React = require('react');
const { CLICK_CELL } = require('./constant');
const { useCallback, memo } = React;

const Td = ({ dispatch, rowIndex, cellIndex, cellData } ) => {
  
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