const React = require('react');
const { useContext, memo } = React;
const { TableContext } = require('./Context');
const Td = require('./Td');

const Tr = ({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
  return (
    <tr>
      {Array(tableData[0].length).fill().map((td, i) => 
      <Td rowIndex={rowIndex} cellIndex={i}/>
      )}
    </tr>
  );
}

module.exports = memo(Tr);