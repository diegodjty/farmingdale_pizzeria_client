import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import hungry from '../assets/hungry.webp'
import eating from '../assets/eating.webp'
import {db} from '../firebase'

const Styles = styled.div`
    display: flex;
    background-color: #EFEFEF;
    text-align: center;
    height: 100vh;
    justify-content: center;
    align-items: center;
    h4{
        margin: 0;
    }
    img{
        margin-top: 30px;
    }
`;

const OrderNumber = ({match}) => {
    
    const orderNumber = match.params.id
    const [isReady, setReady] = useState(false);
    
    
    db.collection('orders').where('orderNumber','==',parseInt(orderNumber))
      .onSnapshot(snapshot=>{
          setReady(snapshot.docs[0].data().isReady)
      })
    return (
        <Styles>
            <div className="container">
                <div className="content">
                    {isReady 
                        ?
                            <>
                                <h3>Order Number: #{orderNumber}</h3>
                                <h4> Your order is Ready!</h4>
                                <h4> Enjoy your food</h4>
                                <img src={eating} alt=""/>
                            </>
                        :
                            <>
                                <h3>Order Number: #{orderNumber}</h3>
                                <h4> I know your hungry! but</h4>
                                <h4>In a couple of minutes you would be enjoying your food</h4>
                                <img src={hungry} alt=""/>
                            </>
                    }
                    
                </div>
            </div>
        </Styles>
    );
};

export default OrderNumber;