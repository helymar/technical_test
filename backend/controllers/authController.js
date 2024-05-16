import passport from '../lib/passport.js';
import { UserModel } from '../models/User.js';
import { comparePasswords, hashPassword} from '../lib/bcrypt.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load the environment variables
dotenv.config();

// Export the authentication middleware
export const authenticate = passport.authenticate('jwt', { session: false });

// Your other controller functions can be defined here
// Example:
export const login = async (req, res) => {
   //login an generate token
    const { username, password } = req.body;

    try {
        const user = await UserModel.findByUsername(username);
        
        if (!user || !comparePasswords(password, user.password)) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        const token = jwt.sign({ username: user.username, type: user.type }, process.env.JWT_SECRET, { expiresIn: '4h' });
        res.status(200).json({ message: 'User logged in successfully', token , expiresIn: '4h' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

export const register = async (req, res) => {
    //register a user
    const { name, username, password, type } = req.body;

    try {
        const existingUser = await UserModel.findByUsername(username);

        existingUser ? res.status(400).json({ message: 'User already exists' })
        : await new UserModel(username, hashPassword(password), name).save();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
   
}

