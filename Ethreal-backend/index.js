const express = require('express');
const app = express();
const port = 8000;
const mongoDB = require('./config/db');
const common = require('./common/common')
const cors = require('cors')
mongoDB();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({
  origin:'*'
}));
const Productcontrol = require('./controller/Productcontrol');
const Usercontrol = require('./controller/Usercontrol')

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
//product

app.get('/products',common.verifyToken, Productcontrol.displayproduct);
app.post('/add-product',common.verifyToken, Productcontrol.addproduct); 
app.post('/add-cart',common.verifyToken, Productcontrol.addProductToCart); 
app.get('/cart',common.verifyToken, Productcontrol.getProductsFromCart); 
app.delete('/delete-cart',common.verifyToken, Productcontrol.deleteFromCart); 

app.get('/searchById',common.verifyToken,Productcontrol.getById);
app.delete('/delete-product',common.verifyToken,Productcontrol.deleteproductid);
app.put('/products/:id',common.verifyToken,Productcontrol.updateproduct);
app.get('/products/categories',common.verifyToken, Productcontrol.getAllCategories);
app.post('/products/category',common.verifyToken, Productcontrol.saveCategory);


 
// User

app.get('/users',common.verifyToken, Usercontrol.displayuser); // Display all users
app.post('/register', Usercontrol.registerUser); // Register a new user
app.post('/login', Usercontrol.loginUser); // Login user
app.get('/allUsers',common.verifyToken,Usercontrol.getAllusers);
app.get('/users/:userId',common.verifyToken, Usercontrol.getuserbyid); //get by id
app.delete('/users/:userId',common.verifyToken, Usercontrol.deleteUser); //delete users
app.put('/users/:userId',common.verifyToken,Usercontrol.updateUser); //update the userbyid




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
