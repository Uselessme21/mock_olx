const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')


const register = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
      
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

      
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword,confirmPassword:hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

     
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      const accessToken = jwt.sign({ email: user.email, id: user.id }, 'your-secret-key');
      res.json({ accessToken, message: 'Login successful' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};




module.exports = {
 register,
 login
};
