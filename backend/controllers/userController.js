import asyncHandler from 'express-async-handler';
//@description Authorise user/set token
//route POST /api/users/auth
//@access Public
const authUser = asyncHandler( async(req, res) => {
    res.status(200).json({ message: 'Auth User' })
})

//@description Register a new user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req,res) => {
    res.status(200).json({ message: 'Register User'})
})

//@description Logout a new user
//route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async(req,res) => {
    res.status(200).json({ message: 'Logout User'})
})

//@description Get user profile
//route POST /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async(req,res) => {
    res.status(200).json({ message: 'User profile'})
})

//@description Update user profile
//route PUT /api/users/profile
//@access Public
const updateUserProfile = asyncHandler(async(req,res) => {
    res.status(200).json({ message: 'Update profile'})
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}