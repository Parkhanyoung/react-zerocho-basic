### import vs require
**require:** node js의 모듈 시스템. module.exports로 내보낸 요소를 require로 받아 올 수 있다. 또한 다른 사람이 만든 스크립트도 받아올 수 있다.
**import:** ES6부터 새롭게 도입된 키워드. export default, 혹은 export const로 내보낸 요소를 import로 받아 올 수 있다. require와 마찬가지로 다른 사람이 만든 스크립트도 받아올 수 있다.
*node js에서 채택한 모듈 관련 표준은 CommonJS이다.

~~~javascript
const hello = () => {
  console.log('hello')
}

// type 1
// ES6
export const hello = hello; // import { hello } from xxx;
// Node(CommonJS)
exports.hello = hello; // const { hello } = require('xxx')
module.exports = { hello: 'hello' }; 

// type 2
// ES6
export default hello; // import hello from xxx; [파일당 한 번만 쓸 수 있다.]
// Node(CommonJS)
module.exports = hello; // const hello = require('xxx')

~~~

*webpack은 node js로 구동되기 때문에 기본적으로 require를 사용한다. 하지만 babel이 최신 문법인 import를 require로 바꿔주기 때문에 둘 다 사용할 수 있는 것이다! webpack.config.js는 babel이 트랜스파일해주지 않기 때문에 반드시 node 문법인 require를 사용해야 하지만, babel의 도움을 받는 리액트 컴포넌트 파일은 둘 다 사용 가능하다.    
    
이와 같은 모듈 시스템은 Javascript가 브라우저 밖으로 나올 수 있는 데 아주 중요한 역할을 했다고 한다.    
그렇게 중요한 만큼 복잡하기도 해서 한 번에 이해하기에는 무리가 있을 것 같다.    
여기서는 모듈과 이쯤 친해지고, 이후에 종종 다시 만나면서 조금씩 깊이 있는 이해를 갖추도록 하자.    