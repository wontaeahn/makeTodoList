const { User } = require("../models/User");

let auth = (req, res, next) => {

    //인증 처리 하는곳

    // client cookie에서 token을 가져온다.
    let token = req.cookies.x_auth;

    
    // token을 복호화 후 유저를 찾는다
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    })

    //유저가 있으면 인증 성공

    //유저가 없으면 실패

}

module.exports = { auth };
