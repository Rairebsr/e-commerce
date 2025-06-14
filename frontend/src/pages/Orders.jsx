import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Head from '../components/Head';
import axios from 'axios';

const orders = () => {
  const {backendUrl,token,currency} = useContext(ShopContext);

  const [orderData,setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrderItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItem.push(item)

          })
        })
        setOrderData(allOrderItem.reverse())
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl' >
        <Head text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
          orderData.map((items,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex  items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={items.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{items.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-'>
                    <p >{currency}{items.price}</p>
                    <p>Quantity:{items.quantity}</p>
                    <p>Size:{items.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(items.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{items.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{items.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default orders
