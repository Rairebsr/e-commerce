import { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Head from './Head'
import ProductItem from './ProductItem'
import React from 'react'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts ,setLatestProducts] = useState([]);

  useEffect(()=>{
      setLatestProducts(products.slice(0,10));
  },[products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Head text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>Forever is an eco-chic clothing brand that blends effortless style with planet-first values, crafting garments from organic cotton, bamboo, and recycled fibers in a palette inspired by sunrise hues and twilight tones. Every piece is designed in small batches to reduce waste, sewn by artisans who earn fair wages, and finished with biodegradable tags that tell the story of its journey from fabric to final stitch. Whether it’s a breezy linen shirt that softens with each wear or a versatile dress that moves seamlessly from boardwalk to rooftop, Solstice Threads invites you to celebrate everyday moments in comfort, confidence, and conscious luxury.</p>
      </div>
      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
