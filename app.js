require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
//const { port, MONGO_URI } = process.env;
const { port } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // express 에서 cors 허용 옵션 설정.. 여기 빠뜨리면 cors 오류
const APP = './app/routes'
// const nodes = ['admin','basic','board','game','todo','user']
const nodes = ['basic']
for(const leaf of nodes){
  require(`${APP}/${leaf}.route`)({url:`/api/${leaf}`,app})
} // node 에 해당하는 .route 접미사에 해당하는 내용이 app 으로 불러와진다.
// 여기는 괄호가 2개인데 url 이 들어간 객체를 매개로 즉시실행된다.

// route -> controller -> service 순서로 require 되는 형태다

require(`${APP}/user.route`)({url:`/api/user`,app})

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}
/*
const db = require('./app/models/index')
db.mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(' ### 몽고DB 연결 성공 ### ')
  })
  .catch(err => { console.log(' 몽고DB와 연결 실패', err)
        process.exit();
});
*/
app.listen(port, () => {
  console.log('***************** ***************** *****************')
  console.log('********** 서버가 정상적으로 실행되고 있습니다 *********')
  console.log('***************** ***************** *****************')
})
app.get('/', (req, res) => {
  res.json({"현재 시간 : ":new Date().toLocaleString()})
})

app.get('/api/now', cors(corsOptions),(req, res) => {
  res.json({"now":new Date().toLocaleString()})
})


