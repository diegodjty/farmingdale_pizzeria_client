import React,{useContext,useState} from 'react';
import { CartContext } from './../CartContext';
import {auth} from '../firebase'
import {useHistory} from 'react-router-dom'

const User = () => {

    const [user,setUser] = useState(auth.currentUser)

    let history = useHistory()
    const logoutHandler = () =>{
        auth.signOut()
        history.push("/")
    }
    // console.log(user)
    return (
        <div>
            <h1>User Page</h1>
            <button type="button" className="btn btn-danger" onClick={logoutHandler}>Logout</button>
          {user &&(
              user.email +" "+ user.displayName
          )}
        </div>
    );
};

export default User;