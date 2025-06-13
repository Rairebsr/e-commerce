import userModel from "../models/userModel.js"


//add product to user cart
const addToCart = async (req,res) => {
    try {
        const {userId, itemId, size} = req.body
        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }

        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true, message:"added to cart"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//update user cart
const updateCart  = async (req,res) => {
    try {
        
        const {userId,itemId,size,quantity} = req.body
        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData;

        if (quantity === 0) {
            delete cartData[itemId][size]; // remove size

            // If no sizes left for this item, remove the item entirely
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
        }
        
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true, message:"Cart updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//get user cart data 
const getUserCart = async (req,res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData;

        res.json({success:true,cartData});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export {addToCart,updateCart,getUserCart}