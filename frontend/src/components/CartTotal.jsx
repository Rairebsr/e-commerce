import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Head from './Head'

const CartTotal = () => {
    const{currency,delivery_fee,getCartAmount} = useContext(ShopContext)
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Head text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>SUBTOTAL</p>
            <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>SHIPPING FEE</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency}{getCartAmount()=== 0 ? 0 : getCartAmount()+delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
