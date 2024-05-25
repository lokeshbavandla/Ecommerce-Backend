import { Category } from "../models/category.models.js";
import { Product } from "../models/product.models.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";

const addProduct = async(req,res)=>{
    try {
        const {name, description, mrp, price, discount, categoryNames, images, qty} = req.body;

        if([name, description, mrp, price, images, qty].some((field)=> field == '')) throw new APIError('Fill All the Details');

        const categoryNamesArray = categoryNames?.split(',');

        const categories = [];
        
        for(const categoryName of categoryNamesArray) {
            let category = await Category.findOne({name: categoryName});

            if(!category) {
                category = await Category.create({name: categoryName})
            }

            categories.push(category._id);
        }

        // categoryNames?.map(async (categoryName)=>{
        //     const category = await Category.findOne({name: categoryName});

        //         if(!category) {
        //             category = await Category.create({name: categoryName})
        //         }
    
        //         categories.push(category._id);
        // })

        const product = await Product.create({
            name,
            description,
            price,
            mrp,
            discount,
            categories,
            images,
            qty
        })

        return res.status(201)
        .json(new APIResponse('New Product Added', product))
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.id;

        const product = await Product.findByIdAndDelete(productId);

        if(!product) throw new APIError('Product Not Found')
    
        return res.status(200)
        .json(new APIResponse('Product Deleted'));

    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async(req,res)=>{
    try {

        const productId = req.params.id;
        const {name, description, mrp, price, discount, categoryNames, images, qty} = req.body;

        if([name, description, mrp, price, images, qty].some((field)=> field == '')) throw new APIError('Fill All the Details');

        const categoryNamesArray = categoryNames?.split(',');
    
        const product = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                price,
                images,
                qty,
                discount,
                mrp
            },
            {
                new: true
            }
        )
    
        if(!product) throw new APIError('Product Not Found');
    
        // product.name = name;
        // product.description = description;
        // product.price = price;
        // product.images = images;
        // product.qty = qty;
    
        const categories = [];
    
        for(const categoryName of categoryNamesArray){

            let category = await Category.findOne({name: categoryName});
    
            if(!category) {
                category = await Category.create({name: categoryName});
            }
    
            categories.push(category._id);
        }
    
        product.categories = categories;
    
        await product.save();

        return res.status(200)
        .json(new APIResponse('Product Updated', product))
    
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async(req,res)=>{
    try {

        const productId = req.params.id;
        
        const product = await Product.findById(productId).populate('categories', 'name');

        if(!product) throw new APIError('Product Not Found')

        return res.status(200)
        .json(new APIResponse('Product Details', product));

    } catch (error) {
        console.log(error);
    }
}

const getProducts = async(req,res)=>{
    try {
        
        const product = await Product.find({}).populate('categories', 'name');

        if(!product) throw new APIError('Product Not Found')

        return res.status(200)
        .json(new APIResponse('Product Details', product));

    } catch (error) {
        console.log(error);
    }
}

const getProductsByCategory = async(req,res)=>{
    try {
        const categoryId = req.params.id;

        const categoryProduct = await Product.find({
            categories: {
                $in: [categoryId]
            }   
        })

        return res.status(200)
        .json(new APIResponse('Product Categories', categoryProduct))
    } catch (error) {
        console.log(error);
    }
}

// const getProductsByCategory = async(req,res)=>{
//     try {
//         const {categories} = req.query;

//         const categoryArray = categories?.split(',')?.map(category=>category?.trim());

//         const categoryProduct = await Product.aggregate([
//             {
//                 $match: {
//                     categories: {
//                         $in: categoryArray
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$_id",
//                     product: {
//                         $first: "$$ROOT"
//                     }
//                 }
//             }
//         ])

//         return res.status(200)
//         .json(new APIResponse('Product Categories', categoryProduct))
//     } catch (error) {
//         console.log(error);
//     }
// }

// const getProductsByCategories = async(req,res)=>{
//     try {
//         const categories = req.query.categories;
//         console.log(categories);

//         const categoryArray = categories?.split(',')?.map(category=>category?.trim());
//         console.log(categoryArray);

//         const categoryIds = await Category.find({
//             name: {
//                 $in: categoryArray
//             }
//         })

//         // const categoryProduct = await Product.find({
//         //     categories: {
//         //         $in: categoryArray
//         //     }   
//         // })

//         return res.status(200)
//         .json(new APIResponse('Product Categories', categ))
//     } catch (error) {
//         console.log(error);
//     }
// }

const sortByPrice= async(req,res)=>{
    try {
        const {order} = req.query;

        console.log();

        let sortOrder = 1;

        if (order === 'desc'){
            sortOrder = -1
        }
        else if(order == 'asc') {
            sortOrder = 1
        }

        console.log(sortOrder);

        const products = await Product.find().sort({price: sortOrder})

        if(!products.length) throw new APIError('No Products');

        return res.status(200)
        .json(new APIResponse('Sorted By Price', products))

        
        
    } catch (error) {
        console.log(error);
    }
}

export {
    addProduct,
    deleteProduct,
    getProduct,
    getProductsByCategory,
    updateProduct,
    sortByPrice,
    getProducts
    // getProductsByCategories
}