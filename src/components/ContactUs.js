import React from 'react';
import styled from '@emotion/styled'


const Styles = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: center;
    background-color: #151515;

    .map{
        border: 0;
        width: 100%;
    }
    .contact-info{
        color: #777777;
        font-weight: bold;
        width: 90%;
        margin: auto;
        margin-top: 40px;
        h5{
            color: #E7A637;
            font-weight: bold;
        }
        .contact-card{
            .contact-content{
                i{
                    margin-right: 10px;
                }
                display: flex;
                justify-content: flex-start;
            }
        }
    }
    .opening-hours{
        color: #777777;
        font-weight: bold;
        width: 90%;
        margin: auto;
        margin-top: 20px;
        h5{
            color: #E7A637;
            font-weight: bold;
        }
        .week{
            display: flex;
            justify-content: space-between;
        }
    }
    footer{
        border-top: solid 1px #777777;
        padding-top: 40px;
        color: #777777;
        font-weight: bold;
    }


    @media (min-width: 1024px){
        .contact-section{
            width: 50%;
            margin: auto;
            display: flex;
            justify-content: center;
        }
        h5{
            text-align: left;
        }
        .contact-info{
            margin-top: 20px;
            .contact-card{
                text-align: center;

            }
        }
        .opening-hours{
            width: 50%;
            .opening-content{
                text-align: left;
                .week{
                    flex-direction: column;
                    p{
                        margin: 2px;
                    }
                }
            }
        }
    }
`

const ContactUs = () => {
    return (
        <Styles id="contactUs">
            <iframe 
                className="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.542995242238!2d-73.42942640857426!3d40.75276397242866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3120fe085fe73a79!2sFarmingdale%20Campus%20Center!5e0!3m2!1sen!2sus!4v1616757931101!5m2!1sen!2sus"
                height="450"
                allowFullScreen=""
                loading="lazy"
                title="Pizzeria map"
            ></iframe>
            <div className="contact-section">
                <div className="contact-info">
                    <div className="contact-card">
                        <h5>Contact Info</h5>
                        <div className="contact-content">
                            <i className="fas fa-map-marker-alt"></i>
                            <p>2350 NY-110, Farmingdale, NY 11735</p>
                        </div>
                        <div className="contact-content">
                            <i className="fas fa-phone"></i>
                            <p>+1 631-420-2000</p>
                        </div>
                        <div className="contact-content">
                            <i className="fas fa-envelope"></i>
                            <p>farmingdalepizza@gmail.com</p>
                        </div>
                    </div>
                    <div className="opening-hours"></div>
                </div>
                <div className="opening-hours">
                    <h5>Opening Hours</h5>
                    <div className="opening-content">
                        <div className="week">
                            <p>MONDAY - THURSDAY</p>
                            <p>10:00 AM - 11:00 PM</p>
                        </div>
                        <div className="week">
                            <p>FRIDAY - SUNDAY</p>
                            <p>12:00 AM - 03:00 AM</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                ALL RIGHTS RESERVED FARMINGDALE PIZZA © | 2021
            </footer>
        </Styles>
    );
};

export default ContactUs;