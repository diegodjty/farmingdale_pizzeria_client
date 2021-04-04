import React from 'react';
import styled from '@emotion/styled'
import aboutusimg from '../assets/aboutus.jpg'

const Styles = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #F0F0F0;
    text-align: center;

    .content{
        p{
            margin-top: 40px;
        }
        img{
            width: 100%
        }
    }

`
const AboutUs = () => {
    return (
        <Styles id="aboutUs">
            <div className="container">
                <h3>About us</h3>
                <div className="content">
                    <p>Farmingdale Pizzeria is your favorite local pizzeria, born from a desire to provide fresh, delicious pizza. We use only the best ingredients, hand toss our dough daily, cook each pizza to perfection in our brick ovens. Our newly renovated space will whisk you away to historic Italy, with exposed brick walls and classical Italian decor. We also offer ordering online, with our newly renovated website. Ordering our delicious food has never been easier, we’ll even let you know when your order is ready!</p>
                    <img src={aboutusimg} alt=""/>
                </div>
            </div>
        </Styles>
    );
};

export default AboutUs;