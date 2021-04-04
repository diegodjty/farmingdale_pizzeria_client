import React,{useState,createContext} from 'react';


export const CartContext = createContext();

export const CartProvider = (props) =>{
    const [cart,setCart] = useState([])
    const [user,setUser] = useState(null)
    return(
        <CartContext.Provider value={[cart,setCart,user,setUser]}>
            {props.children}
        </CartContext.Provider>
    )
}