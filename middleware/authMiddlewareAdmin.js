import jwt from 'jsonwebtoken'

import asyncHandler from 'express-async-handler'

import Admin from '../models/adminModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token ; 

    token =req.headers['token'];
    if(token)
    {
       try {
           const decoded = jwt.verify(token, 'abc123')
           req.user = await Admin.findById(decoded.userId).select('-password')
           next()

        }    
       catch{
        res.status(401)
        throw new Error('Wrong token ')
       }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token ')
    }
})


export  { protect }