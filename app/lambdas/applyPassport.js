
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local"; //strategy 를 로컬에서 실행할시 이것을 사용
import db from '../models/index.js'


const applyPassport = (passport, _secretOrKey) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header에 bearer스키마에 담겨온 토큰 해석할 것
        secretOrKey: _secretOrKey
    };
    const verifyUser = async (jwt_payload, done) =>{
        const User = db.User
        User.findOne({
            userid: jwt_payload.id
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }
    passport.use(new Strategy(jwtOptions,verifyUser));
    return passport
}
export default applyPassport