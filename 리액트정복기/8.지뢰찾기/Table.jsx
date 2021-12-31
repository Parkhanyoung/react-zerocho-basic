const React = require('react');
const { TableContext } = require('./Context');
const { useContext, memo } = React;
const Tr = require('./Tr');

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
  <table>
    {Array(tableData.length).fill().map((tr, i)=><Tr rowIndex={i} />)}
  </table>
  )
};

module.exports = memo(Table);