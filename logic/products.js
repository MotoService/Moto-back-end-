const PRODUCTS = require('../model/products');
module.exports ={
    getProducts : async (req, res, next) => {
        const products = await PRODUCTS.find();
        res.json({
            "test" : "saleem",
            result : products.map(res => {
                return { 
                id : res.id ,
                name : res.name,
                desc : res.desc,    
            }
            })
        })
    },
    insertproduct : async (req,res)=>{
        const product = await new PRODUCTS({
            name : req.body.name,
            price : req.body.price,
            desc : req.body.desc,
        }).save()

       

        res.json({"message": "inserted successfully",
        id : product.id,
        name : product.name})
    },

    deleteProducts : async (req, res)=>{
        const id = req.params.id;
        const del =await PRODUCTS.findByIdAndRemove(id);
        res.json({"delete":del});
    }
}