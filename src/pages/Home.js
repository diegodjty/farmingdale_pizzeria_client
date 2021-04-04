import React,{useContext} from 'react';
import Jumbotron from '../components/Jumbotron';
import Reservations from '../components/Reservations';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import Menu from '../components/Menu'
import styled from '@emotion/styled'
import CartImg from '../assets/cart.svg'
import { Link } from 'react-router-dom';
import { CartContext } from './../CartContext';
import NavbarComponent from './../components/NavbarComponent';
import MobileNavBar from './../components/mobile/MobileNavbar';

const Styles = styled.div`

    .cartButton{
        position: fixed;
        bottom: 20px;
        right: 10px;
        z-index: 99;
        font-size: 18px;
        border: none;
        outline: none;
        background-color: #EAA23C;
        opacity: .8;
        color: white;
        cursor: pointer;
        padding: 15px;
        border-radius: 20px;
        img{
            height: 35px;
            width: 35px;
        }
    }
`;

const Home = () => {

    //eslint-disable-next-line
    const [cart, setCart, user] = useContext(CartContext)
    return (
        <Styles id="home">
            <MobileNavBar />
            <NavbarComponent />
            <Jumbotron />
            <Menu />
            <Reservations />
            <AboutUs />
            <ContactUs />
            {cart.length !== 0 && (
                <Link to="/cart">
                    <div className="cartButton">
                        <img src={CartImg} alt="" />
                    </div>
                </Link>

            )}
        </Styles>
    );
};

export default Home;