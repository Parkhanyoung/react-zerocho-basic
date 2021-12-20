const React = require('react');

const GuGuDan = require('./1.구구단/GuGuDan');
const WordRelay = require('./2.끝말잇기/WordRelay');
const NumberBaseball = require('./3.숫자야구/NumberBaseball');
const ResponseCheck = require('./4.반응속도/ResponseCheck');

const Collection = () => {
  return (
  <>
    <GuGuDan />
    <WordRelay />
    <NumberBaseball />
    <ResponseCheck />
  </>
  )
}

module.exports = Collection