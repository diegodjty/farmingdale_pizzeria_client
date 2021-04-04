import React from 'react';
// import styled from '@emotion/styled'

// const styles = styled.td`
//     display: flex;
//     justify-content: space-between;
// `

const OrderDetails = ({price,quantity,name}) => {

    return (
        <tr>
            <td>{quantity}</td><td>{name}</td><td>{price}</td>
        </tr>
    );
};

export default OrderDetails;