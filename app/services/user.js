import db from '../models/index.js'
import getDatabase from '../lambdas/getDatabase.js'

export default function UserService() {
    const User = db.User;
    const dbo = getDatabase();
    const dbConnect = dbo.getDb();

    return {
        join(req, res) {
            console.log('### 5. join 진입 ###');
            new User(req.body).save(function (err) {
                if (err) {
                    res.status(500).json({message: err});
                    console.log("가입 실패");
                    return; // 리턴 꼭 넣을것 안그러면 next 가 자동실행된다.
                } else {
                    console.log('### 5. join 성공 ###');
                    res.status(200).json({ok: "ok"});
                }
            }); // 클라이언트에서 요청한 페이로드는 body 에 들어가 있다.
        },
        login(req, res) {
            User.findOne({
                userid: req.body.userid
            }, function (err, user) {
                if (err)
                    throw err
                if (!user) {
                    res.status(401).send({success: false, message: '해당 ID가 존재하지 않습니다'});
                } else {
                    console.log(' ### 로그인 정보 : ' + JSON.stringify(user))
                    user.comparePassword(req.body.password, function (_err, isMatch) {
                        if (!isMatch) {
                            res.status(401).send({message: 'FAIL'});
                        } else {
                            user.generateToken((err, user) => {
                                if (err)
                                    res.status(400).send(err)
                                //  쿠키, 로컬스토리지에 토큰을 저장한다.
                                res.status(200).json(user)
                            })
                        }
                    })
                }
            })
        },
        logout(req, res) {
            req.logout();
            res.json({msg: 'LOGOUT'});
        },
        getUsers(_req, res) {
            User.find().exec(
                (err, user) => {
                    res.status(200).json({user});
                }
            );
        },
        checkDuplicateUserid(req, res) {
            User
                .findById({userid: req.body.userid})
                .exec((err, user) => {
                    if (err) {
                        res
                            .status(500)
                            .send({message: err});
                        return;
                    }
                    if (user) {
                        res
                            .status(400)
                            .send({message: "ID가 이미 존재합니다"});
                        return;
                    }
                })
        },
        getUserById(req, res) {
            const userid = req.body.userid
            User
                .findById({userid: userid})
                .exec((_err, user) => {
                    return user
                })
        },
        delUser(req, res){
            return "";
        }
    }
}