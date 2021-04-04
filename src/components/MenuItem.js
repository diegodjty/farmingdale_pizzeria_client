import React,{useState} from 'react';
import {toast } from 'react-toastify';
import 'animate.css'
import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled'

const Styles = styled.div`
    width: 90%;
    max-width: 1240px;
    .card{
        padding: 1rem;
        margin: 1rem;
        border: none;
        &:last-child{
            margin-bottom: 0;
        }
    }
    .buttons{
        display: flex;
        justify-content: space-between;
    }
`;

const MenuItem = ({name,price,desc,id,setItem}) => {

    const [isSelected, setSelected] = useState(false)
    const [quantity, setQuantity] = useState(1)


    const handleMouseEnter = ()=>{
        setSelected(!isSelected)
    }

    const handleCick = (e) =>{
        setItem({id:e.currentTarget.dataset.id,quantity: quantity})
        toast.info(' Item Added 🍕', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    } 

    const handleChange = (e)=>{
        setQuantity(e.target.value)
    }

    return (
        <Styles  onClick={handleMouseEnter}   >
            <div className={isSelected ? 'card  animate__animated animate__pulse ' : 'card'}> 
                <div className="menu-card-name">
                    <h5>{name}</h5>
                </div>
                <div className="menu-card-desc">
                    <p>{desc}</p>
                </div>
                <div className="menu-card-price">
                    <p>${price}</p>
                </div>
                {isSelected &&(
                    <div className="buttons ">
                        <button 
                            type="button" 
                            className="btn btn-info"  
                            data-id={id} 
                            onClick={handleCick}>Add to order
                        </button>
                        <div className="quantityContainer">
                            Quantity: <input required onChange={handleChange} className="quantity" value={quantity} type="number" min="1" max="10"/>
                        </div>
                    </div>
                )}
            </div>
        </Styles>
    );
};

export default MenuItem;