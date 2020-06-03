const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//bcrypt salt 몇글자인지 설정
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");


const userSchema = mongoose.Schema({
    name: { 
        type:String,
        maxlength: 50
    },
    email: {
        type:String,
        trim: true,
        unique: 1
    },
    password: {
        type:String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength: 50
    },
    role: {
        type:Number,
        default: 0
    },
    image:String,
    token: {
        type:String
    },
    tokenExp: {
        type:Number
    }
}) 

userSchema.pre('save', function( next ){

    //현재 유저정보를 지정
    var user = this;


    //password 변경시 실행
    if(user.isModified('password')){

        //bcrypt salt생성하여 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) return next(err)
        bcrypt.hash(user.password ,salt, function (err, hash) {
            if(err) return next(err)
            user.password = hash
        next()
       })
     })
  } else {
      next()
  }
})



userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainpassword를 암호화하여 비교하기
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err)
        cb(null,isMatch)
    })
}

userSchema.methods.genToken = function(cb){
    var user = this;

    //jsonwebtoken이용하여 토큰 생성
    var token = jwt.sign(user._id.toHexString(),'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null,user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    //토큰을 decode 한다
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디로 유저를 찾은 후
        //client에서 가져온 token 과 DB Token 일치하는지 확인

        user.findOne({"_id" : decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb (null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }