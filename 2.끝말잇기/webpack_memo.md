# Webpack
### 웹팩
여러개의 자바스크립트 파일을 하나의 자바스크립트로 만드는 기술 + 합치는 과정에서 코드를 다듬을 수도 있음    
하나의 웹사이트를 만드는 데 필요한 컴포넌트가 한 두 개가 아니다.     
여러 개의 자바스크립트에 컴포넌트들을 만들고, 웹팩으로 합친다. >> 웹팩이 모듈화를 가능하게 해주었다.      
웹팩을 구동하기 위해서는 Node js가 필요하다.    
실제 서비스할 때에는 웹팩이 필요없다.[개발할 때에만 필요 >> 그래서 npm i **-D(개발용)** webpack webpack-cli]     
     
웹팩을 이용하면 필요한 모듈을 npm에서 불러오기 때문에 html에 react를 불러 오는 script 코드를 적지 않아도 된다.      
       
create-react-app에 대한 의존도를 높여서는 안 됨. 스스로 만들 줄 알게 된 이후에 사용하는 것이 맞음.        
       
jsx 문법을 쓸 거면 확장자를 jsx로 하는 것이 좋음. js와 큰 차이점은 없지만, jsx 문법을 사용한다는 것을 명시하기 위함이다.       

__필요한 패키지__
1. react: 오직 리액트 컴포넌트 사용만을 위한 패키지이다. 보통 react-dom과 함께 사용된다.     
2. react-dom: 리액트 DOM 및 server render의 진입점 역할을 한다. 'ReactDOM.render(<Componet />, node)'와 같이 사용된다.       
3. webpack: 일반적으로 브라우저에서 사용되는 JS 파일들을 묶기(bundle) 위해 사용되는 패키지이다. 이외에도 다른 기능들이 많이 있다.      
4. webpack-cli: webpack setting을 쉽게 할 수 있도록 해주는 명령어들을 제공한다.    
5. babel-loader: babel과 webpack을 이용하여 JS 파일을 트랜스파일링해준다.
6. @babel/core: babel의 핵심 기능이 담겨 있는 기본 패키지이다.   
7. @babel/preset-env: babel이 제기능을 수행하기 위해서는 플러그인이 필요하다. preset은 babel 플러그인들을 모아둔 패키지이다.    
8. preset-react: 최신 리액트를 위한 babel preset 패키지이다.    
9. react-refresh:
10. @pmmmwh/react-refresh-webpack-plugin: 
11. webpack-dev-server:
12. @babel/plugin-proposal-class-properties:
