const React = require('react');
const { memo } = React;
const Td = require('./Td');

const Tr = ({ dispatch, rowData, rowIndex }) => {
  return (
      <tr>
      {Array(rowData.length).fill().map((td, i)=><Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} />)}
      {/* Array(rowData.length).fill().map((td, i)=>(
        useMemo(
          () => <Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} />,
          [rowdata[i]]
          )
        ))  이런식으로 useMemo의 리턴값을 컴포넌트로 두어서 최적화할 수도 있다. */}
      </tr>
  );
}

module.exports = memo(Tr);