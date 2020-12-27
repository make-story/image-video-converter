import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
-
<React.StrictMode>
Strict 모드 

StrictMode는 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구입니다. Fragment와 같이 UI를 렌더링하지 않으며, 자손들에 대한 부가적인 검사와 경고를 활성화합니다.
(Strict 모드는 개발 모드에서만 활성화되기 때문에, 프로덕션 빌드에는 영향을 끼치지 않습니다.)

-
StrictMode는 아래와 같은 부분에서 도움이 됩니다.

> 안전하지 않은 생명주기를 사용하는 컴포넌트 발견
> 레거시 문자열 ref 사용에 대한 경고
> 권장되지 않는 findDOMNode 사용에 대한 경고
> 예상치 못한 부작용 검사
> 레거시 context API 검사


-
React.FC
해당 컴포넌트가 리액트의 함수형 컴포넌트라는 것을 알려주는 방법
export const PageProvider: React.FC = ({ props, children }) => {
  // ...
};
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
