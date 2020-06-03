const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");


//미들웨어 엔드포인트에서 리퀘스트를 받은다음 콜백펑션을받기전에 작업
router.get('/auth', auth , (req, res) => {
    
    //미들웨어 통과 Authenticaiton true 확인됨
    res.status(200).json({
        _id: req.user._id,
        //admin인지 확인 role=1 일반유저 0이 아니면 Admin
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })

})

/* 회원가입 */
router.post('/register', (req, res) => {
const user = new User(req.body)

 user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})


/* 로그인 */
router.post('/login', (req, res) => {
    //요청된 이메일을 DB 검색
    User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
        return res.json({
            loginSuccess: false,
            massage:"제공된 이메일에 해당하는 유저 없음"
        })
    }
     //요청된 이메일을 검색후 해당유저가 있다면 비밀번호가 맞는지 확인

    user.comparePassword(req.body.password , (err, isMatch) => {
        if(!isMatch)
        return res.json({ loginSuccess: false, massage: "비밀번호 틀림"})

     //비밀번호가 맞다면 토큰 생성
        user.genToken((err, user) => {
            if(err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
             //토큰을 저장한다.(쿠키 or 로컬스토리지)
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            }) 
        })
    })
})

 
/* 로그아웃 */
router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id},{ token: "" , tokenExp: ""},(err, user) => {
        if(err) return res.json({ success : false, err});
         return res.status(200).send({
            success: true
        })
     })
 })

module.exports = router;