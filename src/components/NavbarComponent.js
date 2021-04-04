import React,{useEffect,useState} from 'react';

import Logo from '../assets/logo.png'

import styled from '@emotion/styled'


const Styles = styled.div`
   
    position: fixed;
    width: 100%;
    z-index: 100;
    background-color: rgba(0,0,0,0.6);
    nav{
        display: block;
        ul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0;
            li{
                list-style: none;
                img{
                    width: 75px;
                    height: 75px;
                }
                a{
                    text-decoration: none;
                    font-weight: bold;
                    color: #ffc107;
                }
            }
        }
    }

    @media (max-width: 1024px){
        nav{
            display: none;
        }
    }

`

const NavbarComponent = () => {

    const [background, setBackground] = useState(false)
    const listenScrollEvent = (e) =>{
        if(window.scrollY > 70){
            setBackground(true)
        }else{
            setBackground(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll',listenScrollEvent)

        return () => window.removeEventListener('scroll',listenScrollEvent) 
    },[])

    return (
        <Styles 
            style={background 
            ?
                {backgroundColor: 'rgb(0,0,0)'}
            :
                {backgroundColor: 'transparent',transition:'back'}}
             >
           <nav className="container">
               <ul>
                   <li><a href="#menu">Menu</a></li>
                   <li><a href="#reservations">Reservations</a></li>
                   <li className="logo"><a href="#home"> <img src={Logo} alt="Logo" /> </a></li>
                   <li><a href="#contactUs">Contact Us</a></li>
                   <li><a href="#aboutUs">About us</a></li>
               </ul>
           </nav>
        </Styles>
    );
};

export default NavbarComponent;