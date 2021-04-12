import React,{useState,useEffect,useContext} from 'react';
import styled from '@emotion/styled';
import {db,auth,firebase} from '../firebase'
import {toast } from 'react-toastify';
import {Link,useHistory } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';
import OrderDetails from './OrderDetails';
import { CartContext } from './../CartContext';
import swal from 'sweetalert'

import Apple from '../assets/apple.png'
import Paypal from '../assets/paypal.png'
import Credit_debit from '../assets/credit_debit.png'

const Styles = styled.div`
    margin: auto;
    background-color: #efefef;
    h4{
        margin: 20px auto;
    }
    form{
    }
    .payment-method{

        .payment-btns{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 80%;
            margin: auto;
            .button{
                width: 100%;
                padding: 10px 0px;
                img{
                    width: 100%;
                    cursor: pointer;
                }
            }
        }
    }
    .container{
        border-radius: 10px;
        .top-links{
            display: flex;
            justify-content: space-between
        }
    }
    .order-description{
        width: 100%;
        margin-top: 10px;
        border-radius: 5px;
        .table{
            border: none;
            display: table;
            thead{  
                width: 100%;              
                tr{
                    border: none;
                    th{
                        border: none;
                    }
                    td{
                        
                    }
                }
            }
            tbody{
                width: 100%;
            }
        }
        
        .order-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between
        }

        .btn-success{
            margin: auto;
        }
    
    }
    .button_container{
            margin-top: 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content: center
        }
        
        @media (min-width: 1024px){
            form{
                width: 50%;
                margin: auto;
                padding: 50px 0px;
            }
            .container{
                background-color: white;
                margin-top: 20px;
            }
            .payment{
                width: 50%;
                margin: auto;
                
                .payment-method{
                    width: 70%;
                    margin: auto;

                }
                .credit-debit{
                 
                }
            }
            .table{
                width: 50%;
                margin: auto;
            }
            .button_container{
                padding-bottom: 50px;
            }
    }
    
`;


const Cart = () => {
    
    const [alert,setAlert] = useState(false)
    const [cart,setCart] = useContext(CartContext)
    const [order,setOrder] = useState({})
    const [total,setTotal] = useState(0)
    const [debitCreditOpen, setDebitCreditOpen] = useState( false)
    const [user,setUser] = useState(auth.currentUser)
    const [userDB,setUserDB] = useState({})
    const history = useHistory()

    // ASk to login to get reward poinst
    useEffect(() => { 
        // if no user is sign in reroute to login page
        if(!user){
            swal({
                title: "Reward Points",
                text: "Want to get Reward points? Just Log In or Create an Account",
                buttons: [true,"Login"],
              })
              .then((login) => {
                if (login) {
                  history.push("/login")
                }
              });
        }else{
            // get data from the user that is log in
            db.collection('user').doc(user.uid)
            .get()
            .then((doc)=>{
                setUserDB({
                    email: doc.data().email,
                    id: doc.data().id,
                    name: doc.data().name,
                    number: doc.data().number,
                    points: doc.data().points
                })
            })
            .then(()=>{
                setOrder({
                    ...order,
                    name: user.displayName,
                })

            })
        }
    }, [user])

    useEffect(() => {
        setOrder({
            ...order,
            number: userDB.number
        })
    }, [order.name])

    // get the total if the entire order
    useEffect(() => {
        if(cart.length !== 0){
            let totalx = 0
            cart.map((detail)=>{
               return totalx+=(parseFloat(detail.price)*parseFloat(detail.quantity))  
            })
            setTotal(totalx)
        }
    }, [cart])
    
   // place order
    const handleSubmit = (e) =>{
        if(order.name === "" ||
           order.number === "" ||
           typeof(order.name) !== 'undefined' ||
           typeof(order.number) !== 'undefined'){
            console.log('full')
            setAlert(false)
            if( cart.length !== 0){
                console.log(order.name)
                e.preventDefault()
                db.collection('orders').add({
                    name: order.name,
                    number: order.number,
                    order: cart,
                    total: total,
                    createdAT: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((docRef) =>{
                    console.log(docRef.id)
                })
                .catch((error)=>{
                    console.error(error)
                })
                toast.success('Order Placed 🍕', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                if(user){
                    let time = firebase.firestore.Timestamp.now()
                    db.collection('user').doc(user.uid).set({
                        orderHistory: firebase.firestore.FieldValue.arrayUnion(
                            {
                                cart: cart,
                                total: total,
                                createdAT: time
                            }
                        )
                    },{merge: true})
                    db.collection('user').doc(user.uid).update({
                        points: userDB.points + 10
                    })
                }
                history.push('/')
            }
            
            setOrder({})
            setTotal(0)
            setCart([])
            document.getElementById('myform').reset()
        }else{
            setAlert(true)
        }
    }

    const handleChange = (e) =>{
        setOrder({
            ...order,
            [e.target.name] : e.target.value
        })
    }
    const logoutHandler = () =>{
        auth.signOut()
        history.push("/")
    }

    return (
        <Styles>
            <div className="container">
                <div className="top-links">
                    <Link to="/" ><span>&#8592;</span>Go back</Link>
                    {user 
                        ?
                            <Link className="login-btn" onClick={logoutHandler} >Logout<span>&#8594;</span></Link>
                        :
                            <Link className="login-btn" to="/login" >Login<span>&#8594;</span></Link>
                    }
                </div>
                <form action="" id="myform">
                    <h4 className="text-center">Customer Info</h4>
                    {alert &&(
                        <div className="alert alert-danger" role="alert">
                            All Fields are required
                        </div>
                    )}
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name" value={order.name} required onChange={handleChange}  className="form-control"/>
                    <label htmlFor="number" className="form-label">Phone Number</label>
                    <input type="text" id="number" name="number" value={order.number} required onChange={handleChange} className="form-control"/>
                </form>
                <div className="payment">
                    <div className="payment-method">
                        <h4 className="text-center">Payment Method</h4>
                        <div className="payment-btns">
                            <div className="button paypal">
                                <a href="https://www.paypal.com/us/home" target="_blank" rel="noreferrer"><img src={Paypal} alt=""/></a>
                            </div>
                            <div className="button apple-pay">
                                <a href="https://www.apple.com/apple-pay/" target="_blank"rel="noreferrer" ><img src={Apple} alt=""/></a>
                            </div>
                            <div className="button credit-debit">
                                <img src={Credit_debit} onClick={()=>setDebitCreditOpen(!debitCreditOpen)} alt=""/>
                            </div>
                        </div>
                    </div>
                    {debitCreditOpen && (
                        <div className="credit-debit">
                            <h4 className="text-center">Debir or Credit</h4>
                            <label htmlFor="cardName" className="form-label">Name on Card</label>
                            <input type="text" name="cardName" className="form-control"/>
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input type="text" name="cardNumber" className="form-control"/>
                            <label htmlFor="expMonth" className="form-label">Exp Month</label>
                            <input type="text" name="expMonth" className="form-control"/>
                            <label htmlFor="expYear" className="form-label">Exp Year</label>
                            <input type="text" name="expYear" className="form-control"/>
                            <label htmlFor="cvv" className="form-label">CVV</label>
                            <input type="text" name="cvv" className="form-control"/>
                            
                        </div>
                    )}
                </div>
                <div className="order-description">
                    <h4 className="text-center">Order Description</h4>
                        <div className="table">
                            <thead>
                                <tr>
                                    <th>Quantity</th>
                                    <th>item</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((detail)=>{
                                    return (
                                        <OrderDetails
                                            key={detail.name}
                                            name={detail.name}
                                            price={detail.price}
                                            quantity={detail.quantity}
                                        />
                                    )
                                })}
                            <tr>
                                <td>Total</td>
                                <td></td>
                                <td>${total.toFixed(2)}</td>
                            </tr>
                            </tbody>
                        </div >                
                </div>
                <div className="button_container">
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>Place Order</button>
                </div>

            </div>
        </Styles>
    );
};

export default Cart;