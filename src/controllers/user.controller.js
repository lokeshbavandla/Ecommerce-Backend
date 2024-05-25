import { User } from "../models/user.models.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import jwt from 'jsonwebtoken'
import generateAccessAndRefreshToken from "../utils/generateAccessTokenAndRefreshToken.js";
import { options } from "../constants.js";


const registerUser = async (req,res)=>{
    try {
        const {fullName,email,password} = req.body
    
        if([fullName,password,email].some((field)=> field?.trim() === '')) {
            throw new APIError('All Fields are necessary and fill all details');
        }

        const existedUser = await User.findOne({
            $or: [{fullName}, {email}]
        })
    
        if(existedUser){
            throw new APIError('User already exists');
        }
    
        const user = await User.create({
            fullName,
            email,
            password
        })
    
        if(!user){
            throw new APIError('Cannot Entry in DB');
        }
    
        const createdUser = await User.findById(user._id).select('-password -refreshToken');
    
        res.status(200)
        .json(new APIResponse('User Created', createdUser))

    } catch (error) {
        console.log(error);
    }

}

const loginUser = async (req,res)=>{
    try {
        const { email, password } = req.body;

        console.log(password);

        if(!email.trim() || !password.trim()){
            throw new APIError('Fill all details')
        }

        console.log(typeof password);


        const user  = await User.findOne({email});

        console.log(user);

        if(!user){
            throw new APIError(`User doesn't exist in DB`)
        }

        const passwordCorrect = await user.isPasswordCorrect(password);

        if(!passwordCorrect){
            throw new APIError('Password is Incorrect')
        }

        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);

        const userDetails = await User.findOne(user._id).select('-password -refreshToken');

        return res.status(200)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json(new APIResponse('User is LoggedIn', {userDetails, refreshToken,accessToken}))
                
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req,res)=>{
    try {
        await User.findByIdAndUpdate(req.user._id,
            {
                $unset: {
                    refreshToken:1
                },
            },
            {
                new: true
            }
        )

        return res.status(200)
                .clearCookie('accessToken')
                .clearCookie('refreshToken')
                .json(new APIResponse('User Successfully Logged Out'))

    } catch (error) {
        console.log(error);
    }
}

const getUserDetails = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).select('-password -refreshToken');

        return res.status(200)
                .json(new APIResponse('User Details', user))
    } catch (error) {
        console.log(error);
    }
}

const changePassword = async (req,res)=>{
    try {
        const {oldPassword,newPassword} = req.body;

        if(!oldPassword.trim() || !newPassword.trim()){
            throw new APIError('Fill all details')
        }

        const user = await User.findById(req.user._id);

        if(!user) throw new APIError('No User')

        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

        console.log(isPasswordCorrect);

        if(!isPasswordCorrect){
            throw new APIError('Password is not correct')
        }

        user.password = newPassword;

        await user.save({validateBeforeSave: false});

        console.log('password Changed');

        return res.status(200)
                .json(new APIResponse('Password Changed Successfully'));
        
    } catch (error) {
        console.log(error);
    }
}

const updateUserDetails = async(req,res)=>{
    try {
        const {email,fullName} = req.body;

        if(!email.trim() && !fullName.trim()) throw new APIError('Fill the Details')

        const user = await User.findById(req.user.id).select('-password -refreshToken');

        user.email = email;
        user.fullName = fullName;

        await user.save({validateBeforeSave: false})

        return res.status(200)
                .json(new APIResponse('Details Updated', user))
        
    } catch (error) {
        console.log(error);
    }
}

const refreshAccessToken = async (req,res)=>{
    try {

        const oldRefreshToken = req.cookies?.refreshToken || req.header('Authorization').replace('bearer','')

        if(!oldRefreshToken){
            throw new APIError('Invalid Refresh Token')
        }

        const decodedToken =  jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        if(!decodedToken){
            throw new APIError('The token is not decoded Properly')
        }

        const user = await User.findById(decodedToken?._id);

        if(!user){
            throw new APIError('User is not present in DB')
        }

        if(oldRefreshToken !== user.refreshToken) {
            throw new APIError('Token is Expired or not Valid')
        }

        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(decodedToken?._id);

        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave: false});

        return res.status(200)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json(new APIResponse('New Tokens Generated',{user, refreshToken, accessToken, oldRefreshToken}))

    } catch (error) {
        console.log(error);
    }
}

const allUsersDetails = async(req,res)=>{
    try {
        const user = await User.find().select('-password -refreshToken');

        return res.status(200)
                .json(new APIResponse('User Details', user))
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(req,res)=>{
    try {
        const userId = req.params.id;

        if(!userId) throw new APIError('No UserId');

        const user = await User.findByIdAndDelete(userId);

        if(!user) throw new APIError('NO user Found');
        
            return res.status(200)
            .json(new APIResponse('User Deleted'))
    } catch (error) {
        console.log(error);
    }
}
export {
    registerUser,
    loginUser,
    logout,
    getUserDetails,
    changePassword,
    updateUserDetails,
    refreshAccessToken,
    allUsersDetails,
    deleteUser
}