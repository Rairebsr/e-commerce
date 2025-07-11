import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one image is required']
    },
    category: {type:String,required:true},
    subCategory: {type:String,required:true},
    sizes: {type:Array,required:true},
    bestSeller: {type:Boolean},
    date: {type:Number, required:true}
})

const productMOdel = mongoose.models.product || mongoose.model("product",productSchema)
export default productMOdel