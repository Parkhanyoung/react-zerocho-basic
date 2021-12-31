const React = require('react');
const { BrowserRouter, HashRouter, Route, Routes, Link } = require('react-router-dom');
const NumberBaseball = require('../3.숫자야구/NumberBaseball');
const RSP = require('../5.가위바위보/RSP');
const Lotto = require('../6.로또추첨기/Lotto');

const Games = () => {
  return (
    <div>
      <BrowserRouter>
        <Link to="/number-baseball">숫자야구</Link>
        <Link to="/rsp">가위바위보</Link>
        <Link to="/lotto-generator">로또생성기</Link>
        <div>
          <Routes>
            <Route path="/number-baseball" element={<NumberBaseball />}></Route>
            <Route path="/rsp" element={<RSP />}></Route>
            <Route path="/lotto-generator" element={<Lotto />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

module.exports = Games;