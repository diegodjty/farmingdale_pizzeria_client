import React,{useState,useContext} from 'react';
import { CartContext } from './../CartContext';
import Login from './Login';
import User from './../pages/User';
import {auth} from '../firebase'
import { useHistory } from 'react-router-dom';

const Profile = () => {


    const [user,setUser] = useState(auth.currentUser)
    const history = useHistory()
    return (
        <div>
            {user 
                ?
                    <User /> 
                :
                    history.push('/')
            }
        </div>
    );
};

export default Profile;