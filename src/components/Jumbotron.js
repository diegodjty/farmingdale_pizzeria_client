import React from 'react';
import styled from '@emotion/styled'
import JumboImg from '../assets/jumbotron.png'


const Styles = styled.div`
    .background{
        background: url(${JumboImg});
        background-size: cover;
        background-position: center;
        height: 100vh;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        .center{
            width: 90%;
            text-align: center;
            /* font-family: 'PT Sans', sans-serif; */
            font-family: 'Roboto Slab', serif;
            .name{
                font-size: 5rem;
                font-weight: bold;
            }
            .button{
                display: flex;
                flex-direction: column;
                align-items: center;
                a{
                    border: solid #EAA23C 1px;
                    background: transparent;
                    padding: 10px 30px;
                    width: 70%;
                    color: white;
                    margin: 1rem;
                    font-size: 1rem;
                    &:hover{

                        color: #EAA23C;
                    }
                }
            }
        }
    }

    @media (min-width: 1024px){
        .background{
            background-attachment: fixed;
            .center{
                width: 50%;
                .button{
                    flex-direction: row;
                    button{
                        
                    }
                }
            }
        }
    }

`;

const Jumbotron = () => {
    return (
        <Styles>
            <div className="background">
                <div className="center">
                    <div className="name">
                         Pizza
                    </div>
                    <p>We offer healthy, fresh Italian & American cuisine. That means we use only the finest and freshest ingredients and products. Check out our new interactive website - try it once & you'll be hooked!</p>
                    <div className="button">
                        <a href="#reservations">RESERVATIONS</a>
                        <a href="#menu">OUR MENU</a>
                    </div>
                </div>
            </div>
        </Styles>
    );
};

export default Jumbotron;