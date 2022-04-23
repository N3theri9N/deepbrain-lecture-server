// 람다에서의 apply 구조 : param 있음, return 있음
const applyDotenv = dotenv => {
    dotenv.config()
    return {
        mongoUri : process.env.MONGO_URI,
        port : process.env.PORT,
        jwtSecret : process.env.JWT_SECERT,
        origin : process.env.ORIGIN
    } // .env 에 들어있는 내용을 가져온다. 참고로 보안이슈로 .env 는 루트위치에 넣어야함.
}

export default applyDotenv;