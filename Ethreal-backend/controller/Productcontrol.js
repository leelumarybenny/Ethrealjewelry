const Product = require("../model/Productschema");
const Category = require("../model/Category")
const Cart = require("../model/Cart")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const displayproduct = async (req, res) => {
  console.log("inside",req.query);
  try {
    const {category,sort} = req.query 
    const numericSort = parseInt(sort, 10);

    const pipeline = [
      {
        $match: category ? { category: new ObjectId(category) } : {} // Conditional $match based on category
      },
      {
        $sort: {
          sale_price: numericSort ? numericSort : 1
        }
      },
      {
        $project: {
          _id: 1,
          productName: 1,
          market_price: 1,
          sale_price:1,
          imageUrl:1,
          specification:1,
          discountPercentage: {
            $multiply: [
              {
                $round: [
                  {
                    $divide: [
                      {
                        $subtract: ["$market_price", "$sale_price"] // Calculate discount
                      },
                      "$market_price"
                    ]
                  },
                  2 
                ]
              },
              100 
            ]
          }
        }
      }
    ];
    
    let products = await Product.aggregate(pipeline);
    console.log(products);
    res.json(products); 
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addproduct = async (req, res, next) => {
  console.log("hloooo");
  console.log(req.body);
  const { productName, category, market_price,quantity, sale_price, specification, imageUrl } = req.body;
  try {

    const newproduct = new Product({
      productName,
      category,
      quantity,
      market_price,
      sale_price,
      specification,
      imageUrl
    });
    await newproduct.save();
    return res.status(201).json({ product: newproduct });
  } catch (err) {
    console.error("Error adding product:", err);
    return res.status(400).json({ error: "Validation error" });
  }
};
const getById = async (req, res) => {
  const id = req.query.productId;
  const pipeline = [
    {
      $match: {
        _id: new ObjectId(id) 
      }
    },
    {
      $addFields: {
        discountPercentage: {
          $multiply: [
            {
              $round: [
                {
                  $divide: [
                    {
                      $subtract: ["$market_price", "$sale_price"] 
                    },
                    "$market_price"
                  ]
                },
                2 
              ]
            },
            100 
          ]
        }
      }
    }
  ];
  let productDetails = await Product.aggregate(pipeline);
  if (!productDetails) {
    return res.status(404).json({ message: " No product found" });
  }
  console.log(productDetails[0])
  return res.status(200).json({ data:productDetails[0] });
};

const deleteproductid = async (req, res) => {
  const id = req.query.productId;
  let newproduct;
  try {
    newproduct = await Product.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!newproduct) {
    return res.status(404).json({ message: "unable to rermove the given id" });
  }
  return res
    .status(200)
    .json({ message: "the product is  Deleted successfully" });
};
const updateproduct = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const { itemname, uniqueid, description, Price, available } = req.body;
  let newproduct;
  try {
    newproduct = await Product.findByIdAndUpdate(id, {
      itemname,
      uniqueid,
      description,
      Price,
      available,
    });
    newproduct = await newproduct.save();
  } catch (err) {
    console.log(err);
  }
  if (!newproduct) {
    return res
      .status(404)
      .json({ message: "unable to update by the given ID" });
  }
  return res.status(200).json({ newproduct });
};

const saveCategory = async (req, res) => {
  let newCate = new Category(req.body)
  try {
    await newCate.save();
    return res.status(201).json({ category: newCate });

  } catch (err) {
    console.log(err);
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
  }
};
const getByCategory = async (req, res) => {
  const Category = req.body.Category;
  console.log("Category", Category); 
  let newproduct;
  try {
    newproduct = await Product.findOne({ Category: req.body.Category });
    console.log("newproduct", newproduct); 
  } catch (err) {
    console.log(err);
  }
  if (!newproduct) {
    return res.status(404).json({ message: "No product found" });
  }
  return res.status(200).json({ newproduct });
};

const addProductToCart= async (req, res) => {
  console.log(req.query,req.user._id)
  req.query.orderBy = req.user._id
  console.log(req.query)

  let newCart = new Cart(req.query)
  try {
    await newCart.save();
    return res.status(201).json({ cart: newCart });

  } catch (err) {
    console.log(err);
  }
};

const deleteFromCart= async (req, res) => {
  console.log(req.query.cartId)
  try {
    await Cart.deleteOne({_id:req.query.cartId});
    return res.status(200).json({ message: "item has been deleted" });

  } catch (err) {
    console.log(err);
  }
};

const getProductsFromCart= async (req, res) => {
  let query = [

    {
      '$match': {
        'orderBy':new ObjectId(req.user._id)
      }
    }, {
      '$lookup': {
        'from': 'products', 
        'localField': 'productId', 
        'foreignField': '_id', 
        'as': 'productDetails'
      }
    }, {
      '$unwind': {
        'path': '$productDetails'
      }
    }, {
      '$project': {
        'productDetails': {
          '$mergeObjects': [
            '$productDetails', {
              'cartId':"$_id",
              'quantity': '$quantity',
              'discountPercentage':{
                $multiply: [
                  {
                    $subtract: [1, { $divide: ["$productDetails.sale_price", "$productDetails.market_price"] }]
                  },
                  100
                ]
      
              } 
            }
          ]
        }
      }
    }, {
      '$addFields': {
        "productDetails.discountPercentage": {$round: ["$productDetails.discountPercentage", 2]},
        'totalSalePrice': {
          '$multiply': [
            '$productDetails.sale_price', '$productDetails.quantity'
          ]
        }
        
      }
    }, {
      '$group': {
        '_id': null, 
        'totalAmount': {
          '$sum': '$totalSalePrice'
        }, 
        'products': {
          '$push': '$productDetails'
        }
      }
    }, {
      '$project': {
        '_id': 0, 
        'totalAmount': 1, 
        'products': 1
      }
    }
  ]
  try {
    let result = await Cart.aggregate(query).exec();;
    console.log(result)
    return res.status(200).json({ cartProducts: result[0]||{} });

  } catch (err) {
    console.log(err);
  }
};
module.exports.displayproduct = displayproduct;
module.exports.addproduct = addproduct;
module.exports.getById = getById;
module.exports.deleteproductid = deleteproductid;
module.exports.updateproduct = updateproduct;
module.exports.getByCategory = getByCategory;
module.exports.saveCategory = saveCategory
module.exports.getAllCategories = getAllCategories
module.exports.addProductToCart = addProductToCart
module.exports.getProductsFromCart = getProductsFromCart
module.exports.deleteFromCart = deleteFromCart
