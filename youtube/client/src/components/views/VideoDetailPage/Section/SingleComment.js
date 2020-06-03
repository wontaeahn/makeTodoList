import React,{useState} from 'react'
import {Comment, Avatar, Input} from 'antd';
import { useSelector} from 'react-redux';
import Axios from 'axios';
import LikeDislike from './LikeDislike';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyopen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) =>{
        event.prevntDefault();

      const variable ={
            content:CommentValue ,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if(response.data.success) {
                    setCommentValue("")
                    setOpenReply(false)
                    props.refreshFunction(response.data.result) 
                }else {
                    alert('커멘트 작성 실패')
                }
            })
    }

    const actions =[
        <LikeDislike userId={localStorage.getItem('userId')} commentId={props.comment._id} />
        ,<span onClick={onClickReplyopen} key="comment-basic-reply-to">Reoly to</span>
    ]
    return (
        <div>
            <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt/>}
            content={<p> {props.comment.content}</p>}

            />
  
        {OpenReply && 
        <form style={{ display:'flex'}} onSubmit={onSubmit} >
               <TextArea
               style={{ width: '100%', boerderRadius: '5px'}}
               onChange={onHandleChange}
               value={CommentValue}
               placeholder="코멘트를 작성해 주세요"
               />
            <br />
            <button style={{ width: '20%', height: '52px'}} onClick={onSubmit}>입력하기</button>

           </form>}
            
        </div>
    )
}

export default SingleComment
