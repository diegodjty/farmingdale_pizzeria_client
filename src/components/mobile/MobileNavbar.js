import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom'

import Logo from '../../assets/logo.png'
import BurguerMenuIcon from '../../assets/menu.svg'
import { CartContext } from '../../CartContext';
import styled from '@emotion/styled'


const Styles = styled.div`
    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo{
            img{
                width: 75px;
                height: 75px;
            }
        }
        .burgerMenu{
            img{
                width: 25px;
                height: 25px;
                cursor: pointer;
            }
        }
    }
    ul{
        background-color: rgba(0,0,0,.8);
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        li{
            list-style: none;
            padding: 20px;
            a{
                text-decoration: none;
                color: white;
            }
        }
    }

    @media (min-width: 1024px){
        nav{
            display: none;
        }
    }


`


const MobileNavBar = () => {

    const [isMenuOpen,setIsMenuOpen] = useState(false);
    // eslint-disable-next-line
    const [user] = useContext(CartContext)
    return (
        <Styles >
           <nav className="container">
               <div className="logo">
                   <Link to="/"> 
                        <img src={Logo} alt="Logo" onClick={()=>setIsMenuOpen(false)} /> 
                   </Link>
                </div>
               <div className="burgerMenu" >
                   <img src={BurguerMenuIcon} onClick={()=>(setIsMenuOpen(!isMenuOpen))} alt=""/>
               </div>
           </nav>
           {isMenuOpen && (
                <ul>
                   <li onClick={()=>setIsMenuOpen(false)}><a href="#menu">Menu</a></li>
                   <li onClick={()=>setIsMenuOpen(false)}><a href="#reservations">Reservations</a></li>
                   <li onClick={()=>setIsMenuOpen(false)}><a href="#contactus">Contact Us</a></li>
                   <li onClick={()=>setIsMenuOpen(false)}><a href="#about">About us</a></li>
                   <li onClick={()=>setIsMenuOpen(false)}><Link to="/login">Profile</Link ></li>
               </ul>
               )}
        </Styles>
    );
};

export default MobileNavBar;