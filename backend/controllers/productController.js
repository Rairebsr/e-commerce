import {v2 as cloudinary} from 'cloudinary'

//fn for add product
const addProduct = async (req,res) => {
    try {
        const {name,description,category,subCategory,sizes,bestSeller} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image1[0]
        const image3 = req.files.image3 && req.files.image1[0]
        const image4 = req.files.image4 && req.files.image1[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        console.log(name,description,category,subCategory,sizes,bestSeller)
        console.log(images)

        res.json({})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//fn for list product
const listProducts = async (res,req) => {
    
}

//fn for removing product
const removeProduct = async (res,req) => {
    
}

//fn for single product info product
const singleProduct = async (res,req) => {
    
}

export {listProducts,addProduct,singleProduct,removeProduct}