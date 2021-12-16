### node js
__디렉토리 용도__    
* src/(source): 프로젝트 개발, 빌드에 쓰이는 소스 파일들이 있는 디렉토리이다. 컴파일되어 dist, public, build와 같은 곳으로 가기 전의 original 소스 파일들이 모여 있다.
* dist/(distributable): '배포가능한'이라는 뜻으로, literally 배포가 가능한 상태의 파일들이 위치하는 디렉토리이다. react의 경우에는 소스 파일들이 컴파일된 형태인 app.js가 위치한다. public, build라는 이름이 붙여지기도 한다. 
* assets/: 이미지, 비디오, 폰트, 오디오 등의 static 컨텐츠가 있는 디렉토리이다.
* lib/: external dependencies가 있는 디렉토리이다.
* test/: 프로젝트의 테스트 스크립트, mocks 등이 있는 디렉토리이다.
* node_modules/: npm을 통해 사용하는 JS 패키지들을 위한 라이브러리와 dependencies가 있는 디렉토리이다.  
* vendor/: Composer을 통해 사용하는 PHP 패키지들을 위한 라이브러리와 dependencies가 있는 디렉토리이다.
* bin/: 설치 시 path에 추가되는 파일들이 있는 디렉토리이다.
   
* package.json: npm을 통해 사용하는 JS 패키지들을 위한 라이브러리와 dependencies를 정의하는 파일이다.
* package-lock.json: package.json을 통해 설치되는 dependencies의 구체적인 버전을 명시해둔 파일이다.

