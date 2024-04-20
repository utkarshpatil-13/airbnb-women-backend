import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import User from "../models/user.models.js";

export const verifyjwt = asyncHandler(async(req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
    
        console.log(token);
    
        if(!token){
            throw new ApiError('Unauthorized Request!');
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken._id)
        .select('-password');
    
        if(!user){
            throw new ApiError(401, 'Invalid Access Token');
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token");
    }
})