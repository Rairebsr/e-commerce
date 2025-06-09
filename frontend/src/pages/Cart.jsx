import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Head from '../components/Head';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const cart = () => {

  const {products,currency,carItems,updateQuantity,navigate} = useContext(ShopContext);

  const [cartData,setCartData] = useState([]);

  useEffect(()=>{
    const tempData = [];
    for(const items in carItems){
      for(const item in carItems[items] ){
        tempData.push({
          _id: items,
          size:item,
          quantity:carItems[items][item]
        })
      }
    }
    setCartData(tempData);
  },[carItems]);

  return (
    <div className='border-t pt-14 px-4 sm:px-10'>
      <div className='text-2xl mb-6'>
        <Head text1={'YOUR'} text2={'CART'}/>
      </div>
      <div className='space-y-4'>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=> product._id === item._id);
            return (
              <div key={index} className=' py-4 border rounded-md px-4 grid grid-cols-1 sm:grid-cols-[4fr_1fr_auto] items-center gap-4 bg-white shadow-sm'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded-md' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-sm sm:text-lg font-semibold'>{productData.name}</p>
                    <div className='flex items-center gap-4 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 py-0.5 border rounded-md bg-slate-100'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} className='border-max sm:max-w-20 px-1 sm:px-2 py-1 ' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={()=> updateQuantity(item._id,item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
      </div>
      <div className='flex flex-col-reverse sm:flex-row justify-between gap-10 my-16'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
        </div>
        <div className='w-full text-end'>
          <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-800 transition'>PLACE ORDER</button>
        </div>
      </div>
    </div>
  )
}

export default cart
