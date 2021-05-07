import React from 'react';
import styled from '@emotion/styled'

// @media (min-width:320px) { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */ }
// @media (min-width:480px) { /* smartphones, Android phones, landscape iPhone */ }
// @media (min-width:600px) { /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */ }
// @media (min-width:801px) { /* tablet, landscape iPad, lo-res laptops ands desktops */ }
// @media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
// @media (min-width:1281px) { /* hi-res laptops and desktops */ }

const Styles = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #F0F0F0;
    text-align: center;
    .container{
        width: 90%;
        margin: auto;
    }
    .text{
        margin: 20px;
        p{
            width: 90%;
            margin: auto;
        }

    }
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        .column{
            width: 100%;
            display: flex;
            flex-direction: column;
            margin: 1rem;
            input, select{
                width: 100%;
                border: none;
                margin: 1rem;
                padding: 10px 20px;
                appearance: none;
            }
            select{
                background-color: white;
            }
            input[type="date"]:before {
                content: attr(placeholder) !important;
                color: #aaa;
                margin-right: 0.5em;
            }
            input[type="date"]:focus:before,
            input[type="date"]:valid:before {
                content: "";
            }
            input[type="time"]:before {
                content: attr(placeholder) !important;
                color: #aaa;
                margin-right: 0.5em;
            }
            input[type="time"]:focus:before,
            input[type="time"]:valid:before {
                content: "";
            }
        }
    }
    button{
        border: solid #EAA23C 1px;
        background: transparent;
        padding: 10px 30px; 
        margin: 1rem;
        font-size: 1rem;
        &:hover{

            color: #EAA23C;
        }
    }

    @media (min-width: 1024px){
        form{
            flex-direction: row;
        }
    }
`;

const Reservations = () => {
    return (
        <Styles>
            <div className="container" id='reservations'>
                <div className="text">
                    <div className="title">
                        <h3>Make online reservation</h3>
                    </div>
                    <p>Lorems ipsum dolor sit amet, consectetur adipisicing elit. Quisquam illo praesentium sequi in cum, beatae maiores quae qui.</p>
                </div>
                <form>
                    <div className="column">
                        <input type="text" placeholder="Full Name"/>
                        <input type="text" placeholder="Phone Number"/>
                        <input type="email" placeholder="Email Address"/>
                    </div>
                    <div className="column">
                        <select value="Number of Guests">
                        {/* eslint-disable-next-line*/}
                            <option readOnly>Number of Guests</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <input type="date" placeholder="Date" />
                        <input type="time" placeholder="Time"/>
                    </div>
                </form>
                <button>
                    RESERVE A TABLE
                </button>
            </div>
        </Styles>
    );
};

export default Reservations;