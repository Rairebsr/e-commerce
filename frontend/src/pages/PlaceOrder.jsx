import React, { useContext, useState } from 'react'
import Head from '../components/Head'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const place_order = () => {

  const [method,setMethod] = useState('cod');
  const {navigate,backendUrl,token,carItems,setCartItems,getCartAmount,delivery_fee,products} =useContext(ShopContext)

  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onchangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;


    setFormData(data =>({...data,[name]:value})); {/*...data is spread operator keep rest of state unchanged [name]:value target correct field based on inputs name */}

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      for(const items in carItems){
        for(const item in carItems[items]){
          if (carItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product =>(product._id === items)))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = carItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log(orderItems)
      let OrderData = {
        address : formData,
        items:orderItems,
        amount : getCartAmount() + delivery_fee
      }
      switch(method){
        //api calls for cod
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',OrderData,{headers:{token}})
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }

          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl+'/api/order/stripe',OrderData,{headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }
          else{
            toast.error(responseStripe.data.message)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:plt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-x1 sm:text-2xl my-3'>
          <Head text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="text" placeholder='First name'  />
          <input required onChange={onchangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="text" placeholder='Last name'  /> 
        </div>

        <input required onChange={onchangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="email" placeholder='Email address'  />
        <input required onChange={onchangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="text" placeholder='Street'  />
        
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="text" placeholder='City'  />
          <input required onChange={onchangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="text" placeholder='State'  /> 
        </div>

        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="number" placeholder='Zipcode'  />
          <input required onChange={onchangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="text" placeholder='Country'  /> 
        </div>
        
        <input required onChange={onchangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5px px-3.5 w-full' type="number" placeholder='Phone'  /> 
      
      </div>
      {/*right side */}
      <div className='mt-8'>
        
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>

        <div className='mt-12'>
          <Head text1={'PAYMENT'} text2={'METHOD'}/>
          {/*pay method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5,mx-4' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5,mx-4' src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>
          
          <div className='w-full text-end mt-8'>
            <button type='submit'  className='bg-black text-white px-16 py-3 border rounded-full text-sm'>Place Order</button>
          </div>
          
        </div>

      </div>
    </form>
  )
}

export default place_order
