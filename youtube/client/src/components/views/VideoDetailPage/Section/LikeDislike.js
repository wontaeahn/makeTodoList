import React, {useEffect,useState} from 'react'
import {Tooltip} from 'antd';
import {LikeOutlined} from '@ant-design/icons';
import Axios from 'axios';

function LikeDislike(props) {

    const [Likes, setLikes] = useState(0)
    const [DisLikes, setDisLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)

    let variable = {}

        if(props.video){
            variable= { videoId:props.viedoId , userId: props.userId}
        }else {
            variable = {commentId:props.commentId , userId:props.userId}
        }

useEffect(() => {

  Axios.post('/api/like/getLikes', variable) 
        .then(response => {
            if(response.data.success) {
                // 좋야요 개수
                setLikes(response.data.likes.length)
                //좋아요를 이미 눌렀는지
                response.data.likes.map(like =>{
                    if(like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })
            }else {
                alert('like에 정보 load 실패')
            }
        })


        Axios.post('/api/like/getDisLikes', variable) 
        .then(response => {
            if(response.data.success) {

                // 싫어요 개수

                setDisLikes(response.data.dislikes.length)

                //싫어요를 이미 눌렀는지

                response.data.dislikes.map(dislike =>{
                    if(dislike.userId === props.userId) {
                        setDisLikeAction('disliked')
                    }
                })
            }else {
                alert('disliked에 정보 load 실패')
            }
        })

    }, [])

    const onLike = () => {

        if(LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {

                        setLikes(Likes +1)
                        setLikeAction('liked')

                        if(DisLikeAction !== null) {
                            setDisLikeAction(null)
                            setDisLikes(DisLikes -1)
                        }
                    }else {
                        alert('Like 올리지 못함')
                    }
                })
        }else {

            Axios.post('/api/like/unLike', variable)
            .then(response => {
                if(response.data.success) {

                    setLikes(Likes -1)
                    setLikeAction(null)

                }else {
                    alert('Like 내리지 못함')
                }
            })   
        }
    }

    const onDisLike = () => {

        if(DisLikeAction === null) {

            Axios.post('/api/like/upDisLike', variable)
            .then(response => {
                if(response.data.success) {

                    setDisLikes(DisLikes -1)
                    setDisLikeAction(null)
                    
                }else {
                    alert('DisLike 내리지 못함')
                }
            })

        }else {

            Axios.post('/api/like/unDisLike', variable)
            .then(response => {
                if(response.data.success) {

                    setDisLikes(DisLikes +1)
                    setDisLikeAction('disliked')

                    if(LikeAction !== null) {
                        setLikeAction(null)
                        setLikes(Likes -1)
                    }
                }else {
                    alert('Like 올리지 못함')
                }
            })
        }
    }

    return (
        <div>
            <span ke="comment-basic-like">
                <Tooltip title="Like">
                <LikeOutlined theme={LikeAction === 'liked' ? 'filled' : 'outlined'} 
                onClick={onLike}/>
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto'}}> {Likes} </span>
            </span>&nbsp;&nbsp;

            <span ke="comment-basic-dislike">
                <Tooltip title="DisLike">
                <LikeOutlined theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
                 onClick={onDisLike}/>
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto'}}> {DisLikes} </span>
            </span>
        </div>
    )
}

export default LikeDislike
