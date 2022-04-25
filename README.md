# llama's magazine

라마의 매거진은 일상을 공유할 수 있는 SNS 서비스입니다.

<br>

## Intro

항해99 PBL 과제로 만들게된 프로젝트 입니다.

<br>

## Requirements

- 회원가입, 로그인 기능 만들기
- 게시글 CRUD 만들기
- 게시글에 레이아웃 적용
- 게시글 좋아요 버튼 만들기
- 게시글 댓글 CRUD 만들기
- 메인 페이지의 게시글 리스트에 무한 스크롤 적용
- Route level에 lazy loading 적용
- 상태 관리 툴 사용
- 모든 페이지는 반응형으로 구현
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

<br>

## What I Learned

- Redux, React-redux, Redux-toolkit을 사용하여 전역 상태 관리
- Logger, Redux-devtools 등으로 액션 흐름 캐치
- toolkit의 default middleware인 thunk로 비동기 작업 처리
- Token을 Cookie에 저장하고 API 요청시 토큰 유효성 검사
- Cookie의 path는 "/"로 통일
- React-infinite-scroller를 사용한 페이지네이션
- React-hook-form을 사용하여 state, ref를 별도로 만들지 않고 회원가입, 로그인 처리
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
