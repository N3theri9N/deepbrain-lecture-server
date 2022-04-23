import db from '../models/index.js'
import getDatabase from '../lambdas/getDatabase.js'

export default function UserService() {
    const User = db.User;
    const dbo = getDatabase();
    const dbConnect = dbo.getDb();

    return {
        join(req, res) {
            const data = req.body.save(function(err){
                if(err){
                    res.status(500).json({message : err});
                    console.log("가입 실패");
                    return; // 리턴 꼭 넣을것 안그러면 next 가 자동실행된다.
                } else {
                    res.status(200).json({ ok : "ok" });
                }
            }); // 클라이언트에서 요청한 페이로드는 body 에 들어가 있다.

            res.status(200).json({

            }); // 응답 내용은 여기에 적으면 된다.
        },
        login(req, res){
            const data = req.body;
            res.status(200).json({

            });
        }
    }
}