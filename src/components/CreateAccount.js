import React, { useState } from 'react';
import styled from '@emotion/styled';
import {Link,useHistory} from 'react-router-dom'
import {auth} from '../firebase'

const Styles = styled.div`
    .container{
        background-color: #EFEFEF;
    }
    form{
    }
`;
const CreateAccount = () => {

    const [userInfo, setUserInfo] = useState({})

    const onChangeHandler = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name] : e.target.value
        })
    }

    let history = useHistory()
    const onSubmitHandler = (e) =>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(userInfo.email,userInfo.password)
            .then((userCred) =>{
                userCred.user.updateProfile({
                    displayName: userInfo.name + " " + userInfo.lastName,
                })
                console.log(userCred.user.uid)
                history.push("/")
            })
            .catch((error)=>{
                console.log(error)
            })  
    }

    return (
        <Styles>
            <div className="container">
                <form>
                    <h2>Create Account</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input name='name' type="text" className="form-control" onChange={onChangeHandler}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input name='lastName' type="text" className="form-control" onChange={onChangeHandler}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                        <input name='phoneNumber' type="text" className="form-control" onChange={onChangeHandler}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name='email' type="email" className="form-control" onChange={onChangeHandler}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name= 'password' type="password" className="form-control" onChange={onChangeHandler} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>Submit</button><br></br>
                    <Link to="/login">have an account? Login here!</Link>
                </form>
            </div>
        </Styles>
    );
};

export default CreateAccount;