import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler =(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe and get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Join our style circle and be the first to know about new arrivals, exclusive drops, and members-only perks. Subscribe to our newsletter today and enjoy an instant 20% off your first purchase. It’s our way of saying welcome — because your wardrobe deserves a fresh start, and your inbox deserves something worth opening.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-l outline-none' type='email' placeholder='Enter your email' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
