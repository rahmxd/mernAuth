import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
    //creates token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    //saves token inside of a cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        //site has to be https but only want this in production but not using it on localhost
        //e.g if we are in development this would be false & if in production this would be true
        secure: process.env.NODE_ENV !== 'development',
        //prevents csrf attacks
        sameSite: 'strict',
        //this option works in seconds & we have set it to 30 days same as token
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken;