import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    // Hash password for security since mongodb display password as is
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try { 
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch(e) {
        next(e);
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try { 
        // if email exist
        const validUser = await User.findOne({email: email});
        if(!validUser){
            return next(errorHandler(404, 'User not found!'));
        }
        
        // if email exist check their password by comparing bcyrptjs package comparesync
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(401, 'Wrong password!'));
        }

        // Sign a jwt token to store it in user cookie, sign by passing some unique id and the secret token
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET );
        // destruct password from json res
        const {password: pass, ...rest} = validUser._doc;
        res
            .cookie('access_token', token, {httpOnly: true}) // set httpOnly to make cookie safer
            .status(200)
            .json(rest);
    } catch (e) {
        // call middleware in utils to handle error
        next(e);
    }
}