// 모델링 처리 폴더 models
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from "./User.js"; // require 는 생략 가능하지만 import 는 불가능
mongoose.Promise = global.Promise // promise Async 를 전역으로 셋팅

const db = {
    mongoose : mongoose,
    url : dotenv.MONGO_URI,
    User : new UserModel(mongoose)
};

export default db; // db 객체는 함수 아니다.


/* require 을 쓰는 형태로 model index 를 쓰는 경우
require('dotenv').config();
const { MONGO_URI } = process.env;
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = MONGO_URI
db.user = require('./user.model')(mongoose)

module.exports= db*/
