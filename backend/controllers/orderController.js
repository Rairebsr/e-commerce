import orderMOdel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'


//global variables
const currency = 'inr'
const deliveryCharge = 10

//gateway initialise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing order using cod method
const placeOrder = async (req,res) => {
    try {
        const {userId,items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderMOdel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:'order places'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//placing order using stripe method
const placeOrderStripe = async (req,res) => {
    try {
        const {userId,items, amount, address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderMOdel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity : item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity : 1
        })

        const session = await stripe.checkout.session.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        })

        res.json({success:true,session_url:session_url.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//place order using Razorpay
const placeOrderRazorpay = async (req,res) => {
    
}

//all orders data for admin panel
const allOrders = async (req,res) => {
    try {
        const orders = await orderMOdel.find({})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:true,message:error.message})
    }
}

//user order data forfrontend
const userOrder = async (req,res) => {
    try {
        const {userId} = req.body
        const orders = await orderMOdel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//update order status
const updateStatus = async (req,res) => {
    try {
        const {orderId,status} = req.body
        await orderMOdel.findByIdAndUpdate(orderId, {status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrder,updateStatus}