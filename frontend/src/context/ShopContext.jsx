import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import cart from "../pages/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props)=> {    {/*Creating a Context Provider Component (ShopContextProvider) which wraps children components and passes shared values (like products, currency, and delivery_fee) to them. */}

    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const[carItems,setCartItems] = useState({});
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

    const val ={
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        carItems,addToCart,
        getCartCount,updateQuantity,
        getCartAmount,navigate
    }
    return (
        <ShopContext.Provider value={val}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;