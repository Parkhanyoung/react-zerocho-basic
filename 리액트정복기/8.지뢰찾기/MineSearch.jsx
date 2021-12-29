const React = require('react');
const Form = require('./Form');
const Table = require('./Table')
const { useReducer, createContext } = React;

const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const MineSearch = () => {
  console.dir(Form)
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // context API로 관리하는 데이터에 접근할 컴포넌트들을 provider로 묶어준다.
    <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

module.exports = {
  MineSearch,
  TableContext,
}