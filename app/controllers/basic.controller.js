const { bmi } = require('../services/basic.service');

//req, res : html 에 있는 header request 랑 response.
exports.getBmi = (req, res) =>{
    const {name, height, weight} = req.body // 여기로는 json 형태로 들어온다.
    console.log(`넘어온 JSON 값 : ${JSON.stringify(req.body)}`)
    console.log(`이름 : ${name}`)
    console.log(`키 : ${height}`)
    console.log(`몸무게 : ${weight}`)
    const json = bmi({name, height, weight}) //service 로 payload 로 전달된다. redux 에도 많이 쓰임
    console.log(`계산된 JSON 값 : ${JSON.stringify(json)}`)
    res.status(200).json(json)
  }

  