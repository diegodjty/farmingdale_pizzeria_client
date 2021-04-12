import React from 'react';
import styled from '@emotion/styled'

const Styles = styled.div`
    .order-history-container{
        display: flex;
        justify-content: space-between;
        .order{

        }
        .date{

        }
    }
    .order-desc{
        ul{
            /* list-style: none; */
            text-align: left;
        }
    }
`;

const RecentOrders = ({order}) => {
    return (
        <Styles>
            <div className="order-history-container">
                <div className="order">
                    {order.createdAT.toDate().toLocaleString('en-US',{dateStyle: "full"})}
                </div>
                <div className="date">
                    {"$"+order.total}
                </div>
            </div>
            <div className="order-desc">
                <ul>
                    {(order.cart.map((item)=>{
                        return<li>{item.name}</li>
                    }))}
                </ul>
            </div>
        </Styles>
    );
};

export default RecentOrders;