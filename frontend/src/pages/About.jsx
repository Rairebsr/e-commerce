import React from 'react'
import Head from '../components/Head'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const about = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Head text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col  md:flex-row gap-6'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to FOREVER, your one-stop destination for all things trendy, affordable, and high-quality. Founded with the mission to make online shopping simple and enjoyable, we bring you a carefully curated collection of products that blend style with substance.
            Whether you’re hunting for the perfect outfit, everyday essentials, or that unique gift, we’ve got you covered. Our team is passionate about discovering and delivering the latest trends while ensuring top-notch customer service and satisfaction.</p>
            <p>At FOREVER, we believe shopping should be more than just a transaction—it should be an experience. That’s why we’re committed to:

                🤝 Building lasting relationships with our customers

                📦 Providing fast and reliable delivery

                💬 Offering friendly and responsive support

                🌱 Promoting sustainable and ethical sourcing

                Thank you for choosing us. We’re excited to have you as part of our community!</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>our mission is simple:To make quality products accessible to everyone, everywhere.
              We strive to redefine the online shopping experience by combining affordability, reliability, and style.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Head text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex felx-col md:flex-row text-sm mb:20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>At FOREVER, quality isn’t just a promise—it’s a commitment we uphold in every product we offer. From sourcing materials to final delivery, our quality assurance processes are designed to ensure that you receive only the best.

            🧵 Meticulous Craftsmanship
            Every item undergoes strict checks for durability, design accuracy, and finish. We collaborate with trusted manufacturers and skilled artisans to maintain high standards of production.

            ✅ Customer-Centered Testing
            Before a product hits our shelves, it is tested for real-world performance, comfort, and usability. Your satisfaction is our benchmark for success.

          </p>
        </div>    
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convinenince</b>
              <p className='text-gray-600'>At FOREVER, we believe shopping should be easy, enjoyable, and stress-free. That's why we've designed every aspect of our platform with your convenience in mind.</p>
            </div>
            <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional customer service</b>
              <p className='text-gray-600'>At FOREVER, our customers are at the heart of everything we do. Whether you have a question, concern, or need assistance with your order, we’re here to help—every step of the way.

                📞 24/7 Support
                Our dedicated support team is available around the clock to assist you with your queries and issues.
              </p>
            </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default about
