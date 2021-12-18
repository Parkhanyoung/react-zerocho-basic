const React = require('react');

const Try = ({value}) => {
    return (
      <>
        <li>시도한 숫자: {value.try}</li>
        <li>결과: {value.result}</li>
        <hr/>
      </>
    )
  }

module.exports = Try