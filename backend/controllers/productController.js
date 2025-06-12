import {v2 as cloudinary} from 'cloudinary'
import productMOdel from '../models/productModel.js'
//fn for add product
const addProduct = async (req,res) => {
    try {
        const {name,description,category,price,subCategory,sizes,bestSeller} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image:imageUrl,
            date: Date.now()
        }

        const product = new productMOdel(productData);
        await product.save()
        res.json({success:true,message:"product added"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//fn for list product
const listProducts = async (req,res) => {
    try{
        const products = await productMOdel.find({});
        res.json({success:true,products})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//fn for removing product
const removeProduct = async (req,res) => {
    try{
        await productMOdel.findByIdAndDelete(req.body.id)//send prod_id to body after excecuting remove
        res.json({success:true,message:"product removed"})
    }catch(error){
        console.log(error)
        res.join({success:false,message:error.message})
    }
}

//fn for single product info product
const singleProduct = async (req,res) => {
    try {
        const {productId} = req.body
        const product = await productMOdel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.join({success:false,message:error.message})
    }
}

export {listProducts,addProduct,singleProduct,removeProduct}