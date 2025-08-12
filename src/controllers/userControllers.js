import {
    updateMyProfile,
    getMyProfile
} from "../services/userService.js";

const handleUpdateMyProfile = async (req,res,next) => {
    try {
        const userId = req.user._id;
        const obj = req.body;
        const result = await updateMyProfile(userId,obj);
        return res.status(200).json(result); 
    } catch (err) {
        next(err);
    }
}

const handleGetMyProfile = async (req,res,next) => {
    try {
        const userId = req.user._id;
        console.log('printed',req.user);
        
        const result = await getMyProfile(userId);
        return res.status(200).json(result); 
    } catch (err) {
        next(err);
    }
}

export {
    handleUpdateMyProfile,
    handleGetMyProfile
}