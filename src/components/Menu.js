import React,{useState, useEffect, useContext} from 'react';
import styled from '@emotion/styled'
import {db} from '../firebase'
import MenuItem from './MenuItem';
import { CartContext } from './../CartContext';

const Styles = styled.div`

    background-color: #EFEFEF;
    h3{
        text-align: center;
        margin: 0;
        padding: 2rem;
    }
    h4{
        margin: 1rem 0;
    }
    .container{
        :last-child{
            margin-bottom: 0;
        }
        .menu-cat{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;

const Menu = () => {

    const [cart,setCart] = useContext(CartContext)
    const [menu,setMenu] = useState([])
    const [item,setItem] = useState([])

    useEffect(()=>{
        db.collection('menu').onSnapshot(snapshot =>{
            setMenu(snapshot.docs.map(doc=>({
                id: doc.id,
                post: doc.data()
            })))
        })
    },[])
    
    
    useEffect(()=>{
        if (typeof item.id !=='undefined'){
                db.collection('menu').doc(item.id)
                .get()
                .then((doc)=>{
                    setCart([...cart,{
                        desc: doc.data().desc,
                        name: doc.data().name,
                        price: doc.data().price,
                        quantity: item.quantity
                    }])
                })

        }
        // eslint-disable-next-line
    },[item])
    return (
        <Styles>
            <h3 id="menu">Menu</h3>
            <div className="container">
                <h4>Pizza</h4>
                <div className="menu-cat">
                    {/* eslint-disable-next-line*/}
                    {menu.map((item)=>{
                        if(item.post.category==='pizza'){
                            return (
                                <MenuItem
                                    setItem={setItem}
                                    id={item.id}
                                    key={item.id}
                                    name={item.post.name}
                                    price={item.post.price}
                                    desc={item.post.desc}
                                />
                            )    
                        }
                    })}
                </div>
            </div>
            <div className="container">
                <h4>Appetizers</h4>
                <div className="menu-cat">
                    {/* eslint-disable-next-line*/}
                    {menu.map((item)=>{
                        if(item.post.category==='appetizers'){
                            return (
                                <MenuItem
                                    setItem={setItem}
                                    id={item.id}
                                    key={item.id}
                                    name={item.post.name}
                                    price={item.post.price}
                                    desc={item.post.desc}
                                />
                            )    
                        }
                    })}
                </div>
            </div>
            <div className="container">
                <h4>Salads</h4>
                <div className="menu-cat">
                    {/* eslint-disable-next-line*/}
                    {menu.map((item)=>{
                        if(item.post.category==='salads'){
                            return (
                                <MenuItem
                                    setItem={setItem}
                                    id={item.id}
                                    key={item.id}
                                    name={item.post.name}
                                    price={item.post.price}
                                    desc={item.post.desc}
                                />
                            )    
                        }
                    })}
                </div>
            </div>
        </Styles>
    );
};

export default Menu;