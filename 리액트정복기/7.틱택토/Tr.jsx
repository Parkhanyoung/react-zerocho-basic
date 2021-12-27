const React = require('react');
const Td = require('./Td');

const Tr = ({ dispatch, rowData, rowIndex }) => {
  return (
      <tr>
      {Array(rowData.length).fill().map((td, i)=><Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} />)}
      </tr>
  );
}

module.exports = Tr;