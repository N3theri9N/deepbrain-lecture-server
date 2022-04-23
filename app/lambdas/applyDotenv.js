// 람다에서의 apply 구조 : param 있음, return 있음
const applyDotenv = dotenv => {
    dotenv.config()
    return {
        mongoUri : process.env.MONGO_URI,
        port : process.env.PORT,
        jwtSecret : process.env.JWT_SECERT,
        origin : process.env.ORIGIN
    }
}

export default applyDotenv;