import { createContext, useEffect, useState } from "react";
import cart from "../pages/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props)=> {    {/*Creating a Context Provider Component (ShopContextProvider) which wraps children components and passes shared values (like products, currency, and delivery_fee) to them. */}

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const[carItems,setCartItems] = useState({});
    const [products,setProducts] = useState([])
    const [token,setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId,size)=>{

        if(!size){
            toast.error('Select Product Size');
            return;
        }
        toast.success('Added to Cart');

        let cartData = structuredClone(carItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1;
            }
            else{
                cartData[itemId][size] = 1
            }
        
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] =1;
        }
        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in carItems){
            for(const item in carItems[items]){
                try{
                    if(carItems[items][item] > 0){
                        totalCount += carItems[items][item];
                    }
                }catch (error){

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity)=>{
        let cartData = structuredClone(carItems);

        if (quantity === 0) {
            // Remove the size entry
            delete cartData[itemId][size];

            // If no sizes left for the item, remove the item itself
            if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }
    
    const getCartAmount = ()  => {
        let totalAmount = 0;
        for(const items in carItems){
            let itemInfo = products.find((products)=> products._id === items);
            for(const item in carItems[items]){
                try{
                    if(carItems[items][item] > 0){
                        totalAmount += itemInfo.price * carItems[items][item];
                    }
                }catch(error){

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl+'/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const val ={
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        carItems,addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,
        setToken,token
    }
    return (
        <ShopContext.Provider value={val}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;