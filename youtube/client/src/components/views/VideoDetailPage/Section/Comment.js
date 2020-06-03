import React, {useState} from 'react';
import Axios from 'axios';
import { useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import {Button,Input} from 'antd';

const {TextArea} = Input;

function Comment(props) {
    const videoId = props.videoId
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variable ={
            content:commentValue ,
            writer: user.userData._id,
            postId: videoId 
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if(response.data.success) {
                    setcommentValue("")
                    props.refreshFunction(response.data.result) 
                }else {
                    alert('댓글 저장 실패')
                }
            })
    }

    return (
        <div>
           <br />
           <p> 댓글</p>
           <hr/> 
           {props.commentLists && props.commentLists.map((comment, index)=> (
               (!comment.responseTo && 
            <React.Fragment>
               <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId}/>
               <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists} />
               </React.Fragment>
               )
))}
                
           {}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트 쓰자"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>등록</Button>
            </form>

        </div>
    )
}
export default Comment
