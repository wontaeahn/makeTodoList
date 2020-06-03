import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{ 
        setPassword(event.currentTarget.value)
    }

    const onComfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합닌다.')
        }

        let body = {
            email: Email,
            name:Name,
            password : Password,
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                props.history.push('/login')
                alert('회원가입 성공')
            }else {
                alert('회원가입 실패')
            }
    })

}

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100vh'
        }}>

        <form sytyle={{display : 'flex', flexDirectin: "column"}}
        onSubmit={onSubmitHandler}>
                <label>Email</label><br/>
                <input type="email" value={Email} onChange={onEmailHandler}/><br/>

                <label>Name</label><br/>
                <input type="text" value={Name} onChange={onNameHandler}/><br/>

                <label>password</label><br/>
                <input type="password" value={Password} onChange={onPasswordHandler}/><br/>

                <label>Confirm password</label><br/>
                <input type="password" value={ConfirmPassword} onChange={onComfirmPasswordHandler}/>
                
                <br /><br/><br/>
                <button >
                    회원가입
                </button>


        </form>
            
        </div>
    )
}

export default withRouter(RegisterPage)
