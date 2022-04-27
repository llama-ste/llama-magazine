# llama's magazine

라마의 매거진은 일상을 공유할 수 있는 SNS 서비스입니다.

_📌 API 서버가 5분간 요청을 받지 않은 경우 suspend mode에 들어가기 때문에, 사이트 첫 접속 시 속도가 느릴 수 있습니다._

<br>

## Intro

항해99 PBL 과제로 만들게된 프로젝트 입니다.

<br>

## Requirements

- 토큰 기반 인증 - 회원가입, 로그인, 로그아웃
- 게시글 CRUD
- 4가지 레이아웃을 가진 게시물
- 게시글 좋아요, 댓글 기능
- 게시물 무한 스크롤
- Route lazy loading 적용
- 상태 관리 툴 사용 (redux, recoil 등)
- 반응형 웹
- 예외처리
   * 로그인한 사용자가 로그인, 회원가입 페이지에 접근시 경고문을 보여주고 홈페이지로 이동
   * 로그인하지 않은 사용자가 좋아요 버튼을 눌렀을 경우 경고문을 보여주고 로그인페이지로 이동
   * 백엔드 서버와 통신할때 발생하는 에러 핸들링

<br>

## Tech Stack

- Language: `Javascript`
- Frontend: `React`, `Redux`, `Redux-toolkit`, `Material UI`, `Styled-components`, `React-hook-form`, `React-infinite-scroller`
- Backend: `Ruby On Rails`, `Postgresql`
- [백엔드 Repository](https://github.com/robinseo/llama-magazine-api)
- [API Guide](https://documenter.getpostman.com/view/630693/UyrAFxMJ#652f6750-eaa8-448e-8967-39e5140b5bc1)

<br>

## What I Learned

- Redux, React-redux, Redux-toolkit을 사용하여 전역 상태 관리
- Logger, Redux-devtools를 사용한 디버깅
- redux-thunk로 비동기 작업 처리
- Token 기반의 인증 시스템에 대한 이해
- Cookie의 기본적인 사용법 익힘
- React-infinite-scroller를 사용한 페이지네이션
- React-hook-form을 사용하여 간편하게 회원가입, 로그인 처리
- Postman을 사용하여 REST API 테스트 진행

<br>

## Demo

### 1. 게시글 작성
![게시글작성](https://user-images.githubusercontent.com/90495580/165069198-7872d609-94a4-4ffb-9259-33411e3a8338.gif)


<br>

### 2. 게시물 테스트 (좋아요, 댓글, 삭제, 수정 등)
![게시글테스트](https://user-images.githubusercontent.com/90495580/165069484-fce1ccf6-d671-4f23-93f0-7f773151f32c.gif)

<br>

### 3. 회원가입
![회원가입](https://user-images.githubusercontent.com/90495580/165069518-24b870f6-9bee-43b2-bf6e-4df324b962c1.gif)

<br>

### 4. 로그인
![로그인](https://user-images.githubusercontent.com/90495580/165069532-514b4d87-4c39-4b1c-b742-8ee9aa6e4052.gif)
