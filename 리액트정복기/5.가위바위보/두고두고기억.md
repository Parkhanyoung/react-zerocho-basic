## componentDidMount / componentWillUnmount와 useEffect
흔히 클래스형 컴포넌트에서의 componentDidMount와 componentWillUnmount가 함수형 컴포넌트에서의 useEffect에 대응된다고 한다.      
하지만 그것은 반은 맞고 반은 틀린 소리이다.       
그 이유는 클래스형 컴포넌트는 관리하는 state 값이 변화할 경우, render 메소드만 실행되지만,       
함수형 컴포넌트는 함수 전체가 다시 실행되기 때문이다.     
예시를 들어보겠다.     
~~~javascript
const React = require('react');
const { useState, useEffect, useRef } = React;
const [imgNumber, setImgNumber] = useState(1); 

const numbers = {
  가위: 1,
  바위: 2,
  보: 3
}

const changeHand = () => {
  if (imgNumber === numbers.가위) {
    setImgNumber(numbers.바위);
  } else if (imgNumber === numbers.바위) {
    setImgNumber(numbers.보);
  } else if (imgNumber === numbers.보) {
    setImgNumber(numbers.가위);
  }
};

useEffect(() => {
  setInterval(changeHand, 1000);
  return () => {
    // componentWillUnmount와 유사한 기능 (클린업 함수)
    clearInterval(intervalRef.current);
  }
}, [imgNumber]);
~~~
    
위의 코드는 1000ms 간격을 두고 가위, 바위, 보 이미지가 지속적으로 번갈아 나오는 코드 중 일부이다.     
state로 관리하고 있는 img_number 값에 따라 가위, 바위, 보 중 하나의 이미지가 나타나는데,     
1000ms 간격으로 img_number값이 바뀌면서 그에 따라 화면에 나타나는 이미지도 바뀌는 원리이다.    
       
setInterval은 한 번 실행하면 일정 시간 간격을 두고 지속적으로 실행되는 비동기 함수이다.      
그렇기 때문에 이 상황에서는 componentDidMount에 대응되는 'useEffect + 빈배열'을 이용하면 된다고 생각하기 쉽다.    
처음 렌더될 때 setInterval이 실행되면 그 이후로 시간 간격을 두고 state값이 변경되는 코드가 지속적으로 실행되니 말이다.      
하지만 여기서 'useEffect + 빈배열'을 이용하면 가위에서 바위로 딱 한 번만 바뀌고 멈춘다.     
왜 그럴까?     
그것은 앞에서 말했듯이, 함수형 컴포넌트는 state값이 바뀔 때마다 함수 전체가 재실행되기 때문이다.    
useEffect 내부에 state 값을 변경하는 setImgNumber가 있기 때문에,       
첫 렌더 직후 실행된 setImgNumber에 의해 imgNumber라는 state의 값이 바뀌게 되고, 그에 따라 함수가 재실행된다.    
그로 인해 첫 렌더 시에만 실행되는 useEffect 내부의 함수는 다시 실행되지 않게 된다.    
이것이 'useEffect + 빈배열'을 사용하면 가위에서 바위로 딱 한 번만 변하는 이유이다.     
     
정상 작동을 하기 위해서는 위의 코드처럼 1)useEffect 두번째 인자로 넘기는 배열에 imgNumber를 넣어주고, 2)cleanup 메소드로 setInterval을 취소해야 한다.       
그 이유는,       
1) 함수형 컴포넌트에서는 state(imgNumber)가 바뀔 때마다 컴포넌트 전체 함수가 재실행됨에 따라      
   setInterval이 setTimeout과 동일한 동작을 보이게 되므로 imgNumber가 바뀔 때마다 changeHand 함수를 다시 실행해주어야 하며,    
2) cleanup 메소드를 설정하지 않으면 state값 중 하나라도 바뀔 때마다 setInterval이 하나씩 쌓여서 이미지 변화 속도가 점점 빨라지기 때문이다.       
[물론 이것은 강의 내용 중 클래스형 컴포넌트의 원래 모습을 유지한 채 함수형 컴포넌트로 바꾸는 과정에서 나타난 것이므로 효율적인 코드는 결코 아니다.]         
     
이러한 특성 때문에 useEffect 내부에서 state 값을 변경하는 경우, 그리고 비동기 함수를 사용하는 경우에는 주의를 기울여야 한다.    
클래스형 컴포넌트의 라이프 사이클 메소드와 일대일로 대응된다고 생각했다가는 큰 코를 다칠 수 있다.      