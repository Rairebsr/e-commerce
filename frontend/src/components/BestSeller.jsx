import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Head from './Head';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([])

    useEffect(()=> {
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    },[])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Head text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-33/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover the pieces everyone’s talking about. Our bestselling collection showcases timeless favorites and trendsetting designs loved by our community. Crafted with premium fabrics and a focus on comfort, these styles blend modern aesthetics with everyday wearability. Whether it’s the perfect layering top, the ultimate flattering fit, or a versatile essential that elevates any outfit — these customer favorites are bestsellers for a reason. Refresh your wardrobe with our most-loved picks that sell out fast!
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
        }

      </div>
    </div>
  )
}

export default BestSeller
