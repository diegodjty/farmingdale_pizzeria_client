import React,{useContext,useState,useEffect} from 'react';
import { CartContext } from './../CartContext';
import {auth, db} from '../firebase'
import {useHistory} from 'react-router-dom'
import MobileNavBar from './../components/mobile/MobileNavbar';
import styled from '@emotion/styled';
import RecentOrders from './../components/RecentOrders';


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
                .btn{
                         background-color: #ffc107;
                         color: white;
                         margin-top: 5px;
                         font-weight: bold;
                }
                .edit-profile{
                    
                }
            }
        }
    }
`;

const User = () => {

    const [user,setUser] = useState(auth.currentUser)
    const [userDB,setUserDB] = useState({})
    const [recentOrderLimit,setRecentOrderLimit] = useState(5)


    useEffect(() => {
        db.collection('user').doc(user.uid).get().then((doc)=>{
            setUserDB({
                email: doc.data().email,
                id: doc.data().id,
                name: doc.data().name,
                number: doc.data().number,
                points: doc.data().points,
                orderHistory: doc.data().orderHistory.reverse() // get last orders
            })
        })
    }, [user])

    let history = useHistory()
    const logoutHandler = () =>{
        auth.signOut()
        history.push("/")
    }

   
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
                            {userDB.points}/50
                            
                        </div>
                        <div className="btn" disabled >Redeem Prize</div>
                    </div>
                    <div className="profile-card">
                        <h4>Recent Orders</h4>
                        <div className="recent-orders">
                            {
                                userDB.orderHistory
                                ?
                                    userDB.orderHistory.reverse().slice(0,5).map((order)=>{ // get only the last 5 orders
                                            return <RecentOrders order={order}/>
                                    })
                                    
                                :
                                    null
                            }
                        </div>
                    </div>
                    <div className="profile-card">
                        <h4>Profile</h4>
                        <div className="edit-profile">
                            <div className="btn">Edit Profile</div>
                            <button type="button" className="btn btn-danger" onClick={logoutHandler}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
                
            </div>
        </Styles>
    );
};

export default User;