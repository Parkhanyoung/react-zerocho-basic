const { createContext } = require('react');

const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

module.exports = {
  TableContext
}