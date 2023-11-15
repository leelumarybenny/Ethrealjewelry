const User = require("../model/Userschema");
const bcrypt = require("bcrypt");
const {  validationResult ,check} = require('express-validator');
const common = require('../common/common')

//registeration
const registerUser = async (req, res) => {
    try {
      console.log("req.body",req.body)
      await check('username', 'Username is required').notEmpty().run(req);
      await check('email', 'Invalid email address').isEmail().normalizeEmail().run(req);
      await check('password', 'Password must be at least 3 characters long').isLength({ min: 3 }).run(req);
  
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      req.body.password = await bcrypt.hash(req.body.password, 10);
  
      const user = new User(req.body);
      await user.save();
  
      res.status(201).json({ user: user });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(400).json({ error: 'User registration failed' });
    }
  };
  
// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username });
    console.log("user", user);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    let payload = {
      _id:user._id,
      username:user.username
    }
    const token = await common.token(payload)
    console.log(token)

    
    await res.status(200).json({ message: "Login successful", token:token,username:user.username });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const displayuser = async (req, res) => {
  console.log("inside");
  try {
    const user = await User.find();
    console.log(user);
    res.json(user); 
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllusers = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getuserbyid = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    
    try {
 
      const user = await User.findByIdAndDelete(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //updateuserbyid
const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
  
    try {
     
      const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports.displayuser = displayuser;
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.getuserbyid = getuserbyid;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.getAllusers = getAllusers;
