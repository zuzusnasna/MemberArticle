# MemberArticle

Spring Boot로 실습했던 **회원 및 게시글 CRUD 기능에 React를 연동한 실습 프로젝트**입니다.

기존 Spring Boot 백엔드에 React 프론트엔드를 연결하여
회원 등록·조회·수정·삭제와 게시글 등록·조회·수정·삭제 기능을 구현했습니다.

## 📌 프로젝트 개요

| 항목       | 내용                            |
| -------- | ----------------------------- |
| 목적       | Spring Boot 실습 프로젝트에 React 연동 |
| Backend  | Spring Boot                   |
| Frontend | React                         |
| Database | Oracle                        |
| 주요 기능    | 회원 CRUD, 게시글 CRUD             |
| 통신       | REST API                      |
| 개발 환경    | IntelliJ IDEA, VS Code        |

## 🛠 기술 스택

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Oracle

### Frontend

* React
* Vite
* JavaScript
* CSS

## 📂 프로젝트 구성

```text
MemberArticle
├── Backend
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   └── DTO
│
└── Frontend
    ├── components
    │   ├── MemberForm.jsx
    │   ├── MemberList.jsx
    │   ├── MemberDetail.jsx
    │   ├── ArticleForm.jsx
    │   ├── ArticleList.jsx
    │   └── ArticleDetail.jsx
    └── App.jsx
```

## 🔧 구현 기능

### 회원 관리

* 회원 등록
* 회원 목록 조회
* 회원 상세 조회
* 회원 정보 수정
* 회원 삭제

### 게시글 관리

* 게시글 등록
* 게시글 전체 조회
* 회원별 게시글 조회
* 게시글 상세 조회
* 게시글 수정
* 게시글 삭제

## 🔄 React ↔ Spring Boot 연동

React에서 `fetch()`를 사용하여 Spring Boot REST API를 호출합니다.

```text
React
  ↓
fetch()
  ↓
Spring Boot Controller
  ↓
Service
  ↓
Repository
  ↓
JPA / Hibernate
  ↓
Oracle
```

Spring Boot에서는 REST API를 제공하고, React에서는 해당 API를 호출하여 화면에 데이터를 표시합니다.

## 📡 주요 API

### Member

| Method | URL                 | 기능       |
| ------ | ------------------- | -------- |
| POST   | `/api/members`      | 회원 등록    |
| GET    | `/api/members`      | 회원 전체 조회 |
| GET    | `/api/members/{id}` | 회원 상세 조회 |
| PUT    | `/api/members/{id}` | 회원 수정    |
| PATCH  | `/api/members/{id}` | 회원 부분 수정 |
| DELETE | `/api/members/{id}` | 회원 삭제    |

### Article

| Method | URL                           | 기능         |
| ------ | ----------------------------- | ---------- |
| POST   | `/api/articles?memberId={id}` | 게시글 등록     |
| GET    | `/api/articles`               | 게시글 전체 조회  |
| GET    | `/api/articles?memberId={id}` | 회원별 게시글 조회 |
| GET    | `/api/articles/{id}`          | 게시글 상세 조회  |
| PUT    | `/api/articles/{id}`          | 게시글 수정     |
| DELETE | `/api/articles/{id}`          | 게시글 삭제     |

## 📚 학습 내용

* Spring Boot REST API 복습
* Spring Data JPA CRUD
* DTO를 이용한 데이터 전달
* React 컴포넌트 구성
* `useState`, `useEffect` 활용
* React에서 REST API 호출
* `fetch()`를 이용한 GET / POST / PUT / DELETE 요청
* Spring Boot와 React 간 CORS 설정
* Backend와 Frontend 연동 과정 이해

## 🎯 실습 목적

기존에 학습했던 Spring Boot 회원/게시글 CRUD 기능을 그대로 활용하면서
React를 프론트엔드로 연결하여 **Backend와 Frontend가 API를 통해 데이터를 주고받는 전체적인 흐름을 학습하는 것**을 목적으로 했습니다.
