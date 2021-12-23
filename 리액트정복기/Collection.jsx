const React = require('react');

const GuGuDan = require('./1.구구단/GuGuDan');
const WordRelay = require('./2.끝말잇기/WordRelay');
const NumberBaseball = require('./3.숫자야구/NumberBaseball');
const ResponseCheck = require('./4.반응속도/ResponseCheck');
const RSP = require('./5.가위바위보/RSP');
const Lotto = require('./6.로또추첨기/Lotto');

const Collection = () => {
  return (
  <>
    <Lotto />
    <GuGuDan />
    <WordRelay />
    <NumberBaseball />
    <ResponseCheck />
    <RSP />
  </>
  )
}

module.exports = Collection