# hooks 관련 Tip

## hooks 위치
hooks는 최상위에 위치하는 것이 좋다.         
hooks는 조건문 안에 절대 넣으면 안 되고, 함수나 반복문 안에도 웬만하면 넣지 않는 것이 좋다.       
hooks 안에 다른 hooks를 넣으면 안 된다.     
      
## useEffect 두번째 인자
useEffect 두번째 인자 내에 state 자체가 아니라 state를 이용한 조건을 넣어도 된다.     
예를 들어 'winNumbers.length === 0'를 넣으면 winNumbers라는 배열의 길이가 0이 될 때 useEffect의 첫번째 인자로 넘겨준 콜백 함수가 실행된다.     
     
## 함수형 컴포넌트에서 componentDidMount 안 하고, componentDidUpdate만 하는 방법
~~~js
const mounted = useRef(false);
useEffect(() => {
  if (!mounted.current) {
    mounted = true;
  } else {
    // only when component is updated
    doSomething();
  }
}, [changedState]);
~~~
      
## componentDidUpdate, useEffect 사용법
__componentDidUpdate는 하나의 메소드 내에서 if 문을 사용하여 특정 state의 변경 상태 별로 실행할 함수를 결정한다.__         
~~~js
componentDidUpdate(prevProps, prevState) {
  if (this.state.someArray.length === 0) {
    this.doSomething();
  }
  if (prevState.someState !== this.state.someState) {
    this.doSomething2();
  }
}
~~~
       
__useEffect는 의존하고 있는 state가 다른 경우, 각각의 state 별로 나누어 여러 개의 useEffect를 사용한다.__       
~~~js
useEffect(() => {
  doSomething();
}, [someArray.length === 0]);
useEffect(() => {
  doSomething2();
}, [someState]);
~~~
       
*아래의 표에서 클래스형 컴포넌트의 라이프 사이클 메소드는 세로로 생각하고, 함수형 컴포넌트의 hooks는 가로로 생각한다.        
즉, 라이프 사이클 메소드는 각각의 역할 별로 따로 존재하는 대신에 한 번에 여러 종류의 state를 커버할 수 있다.   
그에 반해 hooks는 일률적으로 특정 state들만(배열로 다수의 state를 지정할 수 있긴 하다) 커버할 수 있는 대신에       
componentDidMount/Update/WillUnmount의 기능을 하나의 함수에서 모두 처리할 수 있다.         
    
||state1|state2|state3|
|-|:---:|:---:|:---:|
|componentDidMount| | | |
|componentDidUpdate| | | |
|componentWillUnmount| | | |