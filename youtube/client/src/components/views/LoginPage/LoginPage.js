import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { withRouter} from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{ 
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password : Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/')
                alert("로그인 성공")
            } else {
                alert('Error')
            }
        })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100vh'
        }}>
        <form sytyle={{display : 'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}>
                <label>Email</label><br/><br/>
                <input type="email" value={Email} onChange={onEmailHandler}/><br/><br/>
                <label>password</label><br/><br/>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                
                <br /><br/><br/>
                <button >
                    로그인
                </button>
        </form>
            
        </div>
    )
}

export default withRouter(LoginPage)
