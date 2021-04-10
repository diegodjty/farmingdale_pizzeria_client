import React,{useContext,useState} from 'react';
import { CartContext } from './../CartContext';
import {auth} from '../firebase'
import {useHistory} from 'react-router-dom'
import MobileNavBar from './../components/mobile/MobileNavbar';
import styled from '@emotion/styled';


const Styles = styled.div`
    background-color: #efefef;
    h3{
        margin-top: 20px;
        text-align: center;
    }
    .profile-container{
        .cards-container{
            margin-top: 20px;
            .profile-card{
                margin: 20px 0px;
                background-color: white;
                border-radius: 5px;
                padding: 10px;
                text-align: center;
                .circle{
                    margin: 10px auto;
                    border: solid #ffc107 2px;
                    height: 150px;
                    width: 150px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2rem;
                }
                .recent-orders{
                    margin: auto;
      
                }
                .edit-profile{
                     .btn{
                         background-color: #ffc107;
                         color: white;
                         margin-top: 5px;
                         font-weight: bold;
                     }
                }
            }
        }
    }
`;

const User = () => {

    const [user,setUser] = useState(auth.currentUser)

    let history = useHistory()
    const logoutHandler = () =>{
        auth.signOut()
        history.push("/")
    }
    // console.log(user)
    return (
        <Styles>
            <div className="container">
            <MobileNavBar />
            <div className="profile-container">
                <h3>Welcome Back!, {user.displayName}</h3>
                <div className="cards-container">
                    <div className="profile-card">
                        <h4>Total Points</h4>
                        <div className="circle">
                            10/50
                        </div>
                    </div>
                    <div className="profile-card">
                        <h4>Recent Orders</h4>
                        <div className="recent-orders">
                            <ol>
                                <li>Chicken Parmegan...<span> --- 04/15</span></li>
                                <li>Barbequo Pizza...<span> --- 04/15</span></li>
                                <li>Chicken Parmegan...<span> --- 04/15</span></li>
                                <li>... --- 04/15</li>
                                <li>Chicken Parmegan... --- 04/15</li>
                                <li>Chicken Parmegan... --- 04/15</li>
                            </ol>
                        </div>
                    </div>
                    <div className="profile-card">
                        <h4>Profile</h4>
                        <div className="edit-profile">
                            <div className="btn">Edit Profile</div>
                        </div>
                    </div>
                </div>
            </div>
                <button type="button" className="btn btn-danger" onClick={logoutHandler}>Logout</button>
            </div>
        </Styles>
    );
};

export default User;