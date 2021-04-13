import React,{useState} from 'react';
import User from './../pages/User';
import {auth} from '../firebase'
import { useHistory } from 'react-router-dom';

const Profile = () => {

    // eslint-disable-next-line 
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