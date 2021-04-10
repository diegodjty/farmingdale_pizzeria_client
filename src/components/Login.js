import React,{useState,useContext} from 'react';
import styled from '@emotion/styled';
import { CartContext } from './../CartContext';
import {auth} from '../firebase'
import {useHistory,Link} from 'react-router-dom'


const Styles = styled.div`
    .container{
        background-color: #EFEFEF;
    }
    form{
    }
`;

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user,setUser] = useState(auth.currentUser)
    let history = useHistory()
    const signInWithEmailAndPasswordHandler = 
            (event,email, password) => {
                event.preventDefault();
                auth.signInWithEmailAndPassword(email,password)
                    .then((userCredential) =>{
                        setUser(userCredential.user)
                        history.push("/")
                    })
                    .catch((error)=>{
                        setError(error.message)
                    })
    };
    
    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
        setPassword(value);
        }
    };
    return (
    <>
        {user 
            ?
                history.push("/profile") 
            :
        <Styles>
            <div className="container">
                <form>
                    <h2>Login</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name='userEmail' type="email" className="form-control" onChange = {(event) => onChangeHandler(event)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name= 'userPassword' type="password" className="form-control"onChange = {(event) => onChangeHandler(event)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>Login</button><br></br>
                    <Link to="/createAccount">Don't have an account? create one here!</Link>
                </form>
            </div>
        </Styles>
        }
    </>
    );
};

export default Login;