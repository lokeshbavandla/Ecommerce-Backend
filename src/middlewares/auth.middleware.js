import jwt from 'jsonwebtoken'
import APIError from '../utils/APIError.js';
import { User } from '../models/user.models.js';

const verifyJWT = async (req,res,next)=>{
    try {

        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('bearer', '');

        if(!token){
            throw new APIError('Invalid Authorization');
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select('-password -refreshToken');

        if(!user){
            throw new APIError('Invalid Token')
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
    }
}

export default verifyJWT;