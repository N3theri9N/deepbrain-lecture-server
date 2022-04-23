import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import UserService from "../services/user.js"

dotenv.config()
const mongoUri = process.env.MONGO_URI
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECERT
const origin = process.env.ORIGIN
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}
const app = express()
app.use(cors());
app.use(function (_req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next(); //
    // 참고자료 : https://expressjs.com/ko/guide/using-middleware.html
    // express js 의 라우팅 미들웨어는 req, res, next 3개를 받음
    // next 를 쓴다면. next() 는 다음의 것을 실행 한다. 예로 여기서는 아래의 /join 이 실행된다.
});

// 서비스는 경로선언은 이렇게 분리되어있는데, 바닐라 스크립트로 만들어야하는 원칙때문.
app.post('/join', cors(corsOptions), (req, res) => {
    UserService().join(req, res);
})

app.post('/login', cors(corsOptions), (req, res) => {
    console.log("로그인 루트 진입");
    UserService().login(req, res)
})

export default app