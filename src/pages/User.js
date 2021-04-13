import React,{useState,useEffect} from 'react';
import {toast } from 'react-toastify';
import {auth, db} from '../firebase'
import {useHistory} from 'react-router-dom'
import styled from '@emotion/styled';
import RecentOrders from './../components/RecentOrders';
import {Link} from 'react-router-dom'

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
                .buttons{
                         background-color: #ffc107;
                         color: white;
                         font-weight: bold;
                }
                .edit-profile{
                    form{
                        text-align: left;
                        margin-bottom: 20px;
                        
                    }
                    .btn-container{
                            display: flex;
                            justify-content: space-around;
                        }
                    .logout{
                        background-color: red;
                    }
                }
            }
        }
    }
    @media (min-width: 1024px){
        .cards-container{
            display: flex;
            justify-content: space-between;

            .profile-card{
                width: 32%;
            }
        }
    }
`;

const User = () => {
    // eslint-disable-next-line
    const [user,setUser] = useState(auth.currentUser)
    const [userDB,setUserDB] = useState({})
    const [userEdit,setUserEdit] = useState({
        name: '',
        number: 0
    })


    useEffect(() => {
        db.collection('user').doc(user.uid).get().then((doc)=>{
            setUserDB({
                email: doc.data().email,
                id: doc.data().id,
                name: doc.data().name,
                number: doc.data().number,
                points: doc.data().points,
                orderHistory: doc.data().orderHistory.reverse().slice(0,5) // get last orders
            })
        })
    }, [user])

    const handleEdit = (e) =>{
        setUserEdit({
            ...userEdit,
            [e.target.name] : e.target.value
        })
    }

    const handleEditSubmit = (e) =>{
        e.preventDefault()

        if(userEdit.name !== ""){
            db.collection('user').doc(user.uid).update({
                name: userEdit.name
            })
            user.updateProfile({
                displayName: userEdit.name
            })
        }

        if(userEdit.number !== ""){
            db.collection('user').doc(user.uid).update({
                number: userEdit.number
            })
        }

        toast.warning('Profile Updated ✏️', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    let history = useHistory()
    console.log(user.displayName)
    const logoutHandler = () =>{
        auth.signOut()
        history.push("/")
    }

   
    return (
        <Styles>
            <div className="container">
            <div className="profile-container">
            <Link to="/" ><span>&#8592;</span>Go back</Link>
                <h3>Welcome Back!, {user.displayName}</h3>
                <div className="cards-container">
                    <div className="profile-card">
                        <h4>Total Points</h4>
                        <div className="circle">
                            {userDB.points}/50
                            
                        </div>
                        <div className="btn buttons" disabled >Redeem Prize</div>
                    </div>
                    <div className="profile-card">
                        <h4>Recent Orders</h4>
                        <div className="recent-orders">
                            {
                                userDB.orderHistory
                                ?
                                    userDB.orderHistory.map((order)=>{ // get only the last 5 orders
                                            return <RecentOrders order={order} key={order.cart}/>
                                    })
                                    
                                :
                                    null
                            }
                        </div>
                    </div>
                    <div className="profile-card">
                        <h4>Profile</h4>
                        <div className="edit-profile">
                        <form action="" id="myform">
                            {/* {alert &&(
                                <div className="alert alert-danger" role="alert">
                                    All Fields are required
                                </div>
                            )} */}
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name" name="name" placeholder={userDB.name} onChange={handleEdit}  required   className="form-control"/>
                            <label htmlFor="number" className="form-label">Phone Number</label>
                            <input type="text" id="number" name="number" placeholder={userDB.number} onChange={handleEdit}  required  className="form-control"/>
                        </form>
                        <div className="btn-container">
                            <div className="btn buttons" onClick={handleEditSubmit}>Edit Profile</div>
                            <button type="button" className="btn logout btn-danger" onClick={logoutHandler}>Logout</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
                
            </div>
        </Styles>
    );
};

export default User;