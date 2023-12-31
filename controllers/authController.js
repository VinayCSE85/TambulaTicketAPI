const UserDAO = require('../dao/userDAO');
const jwtUtils = require('../utils/jwtUtils');
const helper = require('../utils/helper');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const config = require('../config/config');
// Assuming you have retrieved the admin secret key from the environment variables
const admin_secret_key = process.env.ADMIN_SECRET_KEY || config.ADMIN_SECRET_KEY;
const userDAO = new UserDAO();

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username.length < 6 || username.length > 20) {
      return res.status(400).json({ message: 'Username should be between 6 and 20 characters long.' });
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Username should only contain alphanumeric characters.' });
    }
    const existingUser = await userDAO.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken.' });
    }
    const schema = new passwordValidator();
    schema
      .is().min(8)                                // Minimum length 8
      .has().uppercase()                          // Must have uppercase letters
      .has().lowercase()                          // Must have lowercase letters
      .has().digits()                             // Must have digits
      .has().symbols();                           // Must have symbols

    // Validate the password
    if (!schema.validate(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long and contain uppercase letters, lowercase letters, digits, and symbols.' });
    }
    var userId = await helper.generateUniqueUserId();
    // we are hashing passwords to store them securely. Additional security measures
    // like minimum length and high complexity requirements can be enforced for enhanced security
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
        username: username,
        password: hashedPassword,
        userId: userId
    }

    const user = await userDAO.createUser(userData);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.registerAdmin = async (req, res) => {
    try{
        // admin secret key is required while registering a new admin
        // login for admin can be processed through the same route as normal users
        const {username, password, adminSecretKey} = req.body;
        if(adminSecretKey !== admin_secret_key){
            return res.status(401).json({message: 'Invalid admin key.'});
        }
        var userId = await helper.generateUniqueUserId();
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            username: username,
            password: hashedPassword,
            userId: userId,
            role: 'admin'
        }
        const user = await userDAO.createUser(userData);

        res.status(201).json({ message: 'Admin user registered successfully' });

    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Error registering admin' });
      }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Assumption: username is unique
    const user = await userDAO.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwtUtils.generateToken(user);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};
