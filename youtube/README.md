# 유튜브
![메인사진](https://user-images.githubusercontent.com/59378967/83702936-15fdcf00-a649-11ea-9064-39d95dd89189.jpg)

## 목차
- 개요
- 제작과정
- 웹사이트 구조
- 세부내용
- 실행 방법

## 개요
-강의를 들으며 REACT로 구성된 파일 업로드사이트의 구조이해를 알게되며 
유튜브 클론코딩

## 제작과정
- 제작기간 : 20. 5. 25 ~ 20. 6.3
- 제작인원 : 1명

## 웹사이트 구조
![스크린샷(205)](https://user-images.githubusercontent.com/59378967/83701863-f4e7af00-a645-11ea-8672-dfe30891923c.png)



## 세부내용

### 회원가입
![Untitled-1](https://user-images.githubusercontent.com/59378967/84098206-95bcdc80-aa41-11ea-91c6-54a66f334322.jpg)
- 비밀번호의 안전을 위해 bcrypt의 salt를 생성하여 암호화<br/>


![스크린샷(235)](https://user-images.githubusercontent.com/59378967/84099458-9f940f00-aa44-11ea-861a-5ad8a13acb7d.png)


### 로그인


<p float="left">
<img src="https://user-images.githubusercontent.com/59378967/84100387-bc314680-aa46-11ea-996f-711ac323c370.png" width="45%">
  <img src="https://user-images.githubusercontent.com/59378967/84100490-f39ff300-aa46-11ea-806e-68cbdfebc6ea.png" width="52%">
</p>

- 로그인후 비밀번호의 안전을 위해 
- jsonwebtoken 라이브러리 jwt.sign 메소드를 이용하여
- user._id + 'secretToken' = token이 생성됨
### 로그아웃


<p float="left">
<img src="https://user-images.githubusercontent.com/59378967/84103464-0b2eaa00-aa4e-11ea-8a12-b73a188ecc2d.png" width="45%">
<img src="https://user-images.githubusercontent.com/59378967/84103465-0c5fd700-aa4e-11ea-8ab6-d665669707d5.png" width="50%">
</p>
- auth기능 만들어서 toekn 비교로 인증후 로그인이 되었기 때문에
- token을 지워 인증을 풀어 로그아웃 시킨다

### 업로드
![스크린샷(200)](https://user-images.githubusercontent.com/59378967/83703280-0337ca00-a64a-11ea-9a26-1e9f5347cdc2.png)

## 댓글
## 좋아요
