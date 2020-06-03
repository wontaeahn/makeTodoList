const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { DisLike } = require('../models/DisLike');
const { auth } = require("../middleware/auth");


    router.post('/getLike', (req, res) => {

        let variable = {}

        if(req.body.videoId) {
            variable = { videoId:req.body.videoId}
        } else {
            variable = { commentId:req.body.commentId}
            
        }

        Like.find(variable)
        .exec(( err, result) => {
            if(err) return res.json({success: false, err})
            res.status(200).json({success: true, result})
        })
    });


    router.post('/getDisLikes', (req, res) => {

        let variable = {}

        if(req.body.videoId) {
            variable = { videoId:req.body.videoId}
        } else {
            variable = { commentId:req.body.commentId}
            
        }

        Dislikes.find(variable)
        .exec(( err, dislikes) => {
            if(err) return res.json({success: false, err})
            res.status(200).json({success: true, result})
        })
    });



    router.post('/UpLikes', (req, res) => {

        let variable = {}

        if(req.body.videoId) {
            variable = { videoId:req.body.videoId, userId: req.body.userId}
        } else {
            variable = { commentId:req.body.commentId, userId: req.body.userId}
            
        }

        // Like collection에다가 클릭 정보 전달

        const like = new Like(variable)

        Like.save((err, likeResult) => {
            if(err) return res.json({ success: false, err})
        })



        ///DisLike 눌러져 있다면 DisLike - 1

        DisLike.findOneAndDelete(variable)
        .exec((err, disLikeResult) => {
            if(err) return res.status(400).send({ success: false, err})
            res.status(200).json({ success: true})
        })
    });

    router.post('/unLikes', (req, res) => {

        let variable = {}

        if(req.body.videoId) {
            variable = { videoId:req.body.videoId ,userId: req.body.userId}
        } else {
            variable = { commentId:req.body.commentId,userId: req.body.userId}
            
        }

        Like.findOneAndDelete(variable)
        .exec(( err, result) => {
            if(err) return res.json({success: false, err})
            res.status(200).json({success: true})
        })

    });




    router.post('/UpDisLikes', (req, res) => {

        let variable = {}

        if(req.body.videoId) {
            variable = { videoId:req.body.videoId,userId: req.body.userId}
        } else {
            variable = { commentId:req.body.commentId,userId: req.body.userId}
            
        }

        // DisLike collection에다가 클릭 정보 전달

        const dislike = new DisLike(variable)

        Like.save((err, dislikeResult) => {
            if(err) return res.json({ success: false, err})
        })



        ///Like 눌러져 있다면 DisLike - 1

        Like.findOneAndDelete(variable)
        .exec((err, LikeResult) => {
            if(err) return res.status(400).send({ success: false, err})
            res.status(200).json({ success: true})
        })
    });

    router.post('/unDisLikes', (req, res) => {

        let variable = {}

        if(req.body.videoId) {
            variable = { videoId:req.body.videoId,userId: req.body.userId}
        } else {
            variable = { commentId:req.body.commentId,userId: req.body.userId}
            
        }

        DisLike.findOneAndDelete(variable)
        .exec(( err, result) => {
            if(err) return res.json({success: false, err})
            res.status(200).json({success: true})
        })

    });




module.exports = router;