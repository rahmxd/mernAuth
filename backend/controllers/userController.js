import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//@description Authorise user/set token
//route POST /api/users/auth
//@access Public
const authUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }


    // res.status(200).json({ message: 'Auth User' })
})

//@description Register a new user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req,res) => {
    console.log(req.body);

    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        //will use our default error handler
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        //use res because we use res.cookie
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

    //res.status(200).json({ message: 'Register User'})
})

//@description Logout a new user
//route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async(req,res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'User logged out'})
})

//@description Get user profile
//route POST /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async(req,res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };

    res.status(200).json(user);
})

//@description Update user profile
//route PUT /api/users/profile
//@access Public
const updateUserProfile = asyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email

        })

    } else {
        res.status(404);
        throw new Error('User not found')
    }

    res.status(200).json({ message: 'Update profile'})
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}