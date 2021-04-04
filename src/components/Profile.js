import React,{useState,useContext} from 'react';
import { CartContext } from './../CartContext';
import Login from './Login';
import User from './../pages/User';
import {auth} from '../firebase'

const Profile = () => {


    const [user,setUser] = useState(auth.currentUser)
    return (
        <div>
            <User /> 
        </div>
    );
};

export default Profile;