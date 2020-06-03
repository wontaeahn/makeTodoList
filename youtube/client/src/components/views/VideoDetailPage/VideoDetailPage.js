import React ,{useEffect,useState} from 'react'
import { withRouter} from 'react-router-dom';
import { Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Section/SideVideo';
import Subscriber from './Section/Subscriber';
import Comment from './Section/Comment';
import LikeDisLikes from './Section/LikeDislike';


function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = {  videoId: videoId }
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])


    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보 불러오기 실패')
                }
            })

            Axios.post('/api/comment/getComments', variable)
                .then(response => {
                    if(response.data.success){
                        setComments(response.data.Comments)
                    }else {
                        alert('코멘트 정보 불러오기 실패')
                    }
                })
    }, [])


    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))

    }

    if (VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscriber userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
        
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                             actions={<LikeDisLikes video videoId={videoId} userId={localStorage.getItem('userId')} />,[subscribeButton]}
                            >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={<a href="https://ant.design">{VideoDetail.title}</a>}
                                description={VideoDetail.description}
                            />
                        
                        </List.Item>

                            {}
                        <Comment refreshFunction={refreshFunction} commentList={Comment} postId={videoId} />
                       
                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo />

                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}

    

export default withRouter(VideoDetailPage)
