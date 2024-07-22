import express from "express"
import User from "../models/User.js";
import { comparedPassword, hashPassword } from "../auth/userAuth.js";
import Createpost from "../models/Createpost.js"
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import UserComment from "../models/UserComment.js";



export const authRegisterController = async (req, res) => {

    const { name, email, address, password } = req.body;

    if (!name) {
        return res.send({ message: "User name must be Provided" })
    }
    if (!email) {
        return res.send({ message: "User email must be Provided" })
    }
    if (!address) {
        return res.send({ message: "User password must be Provided" })
    }
    if (!password) {
        return res.send({ message: "User name must be Provided" })
    }

    try {

        //Checking whether a user is already registered

        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "You are already Registered"
            })
        }

        // Registration Process
        const hashedpassword = await hashPassword(password)

        let userData = await new User({ name, email, address, password: hashedpassword }).save()

        res.status(201).send({
            success: true,
            message: "User Registered Successfully with hashedpassword",
            userData
        })



    } catch (error) {
        console.log(error)
        res.status(501).send({
            success: false,
            message: "Error in Registration"
        })
    }
}

// Login Controllers



export const authLoginController = async (req, res) => {

    const { email, password } = req.body;
    if (!email) {
        return res.send({ message: "User email must be Provided" })
    }
    if (!password) {
        return res.send({ message: "User password must be Provided" })
    }

    try {


        // Checking Email is registered 
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({
                success: false,
                Message: "Email is not registered, please sign up first",
            })
        }
        let validPassword = await comparedPassword(password, user.password)
        if (!validPassword) {
            return res.status(403).json({
                success: false,
                Message: "Password dos'nt match",
            })
        }

        // let token = await Jwt.sign({_id: user._id, name: user.name}, process.env.JWT_SECRET_KEY, {expiresIn:"1000s"})
        return res.status(200).json({
            success: true,
            Message: "Logged-in successfully",
            user: user,
            // token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            Message: "Internet Server Error - Something went wrong",
            error
        })
    }


}

// //  Forget Password 


export const authForgetpasswordController = async (req, res) => {
    try {
        const { email, newpassword, confirmpassword } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        if (!newpassword || !confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (newpassword !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(newpassword, salt);

        const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while resetting the password",
        });
    }
};


// Change Role 


export const authChangeroleController = async (req, res) => {
    try {
        const { email, newrole, confirmrole } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        if (!newrole || !confirmrole) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (newrole !== confirmrole) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist",
            });
        }

        const newChangeRole = await (newrole);

        const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { role: newChangeRole } }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Change Role Reset successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while resetting the password",
        });
    }
};

// Registration of Article


export const uploadImage = async (req, res) => {
    try {
        const { title, summary, content } = req.body;
        const { filename } = req.file;


        const imgData = await new Createpost(
            {
                title: title,
                summary: summary,
                file: filename,
                content: content
            }).save();

        res.status(201).send({
            success: true,
            message: "File Register Successfully",
            imgData
        })
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Getting Data from Back-end

export const authArticleController = async (req, res) => {
    let result = await Createpost.find();
    res.send(result)
}

// Deleting data of User from front end and backend

export const autharticleDeleteController = async (req, res) => {
    try {
        let Data = await Createpost.deleteOne({ _id: req.params.id })
        if (Data) {
            return res.status(201).send({
                success: true,
                message: "Deleted Record"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(501).send({
            success: false,
            message: "No Record Avaiable"
        })
    }
};

// User Comment Section


export const authCommentController = async (req, res) => {
    const { comment,rating } = req.body;
    
    if (!comment) {
        return res.status(400).send({ 
            success: false,
            message: "Comment must be provided" 
        });
    }
    if (!rating) {
        return res.status(400).send({ 
            success: false,
            message: "Rating must be provided" 
        });
    }

    try {
        const userComment = await new UserComment({ comment,rating }).save();
        
        return res.status(201).send({
            success: true,
            message: "Thank you for your valuable comment",
            userComment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Comment server error - something went wrong",
            error: error.message // Provide the error message for more clarity
        });
    }
};

// Getting Data from Back-end

export const authGettingcommentController = async (req, res) => {
    let commentresult = await UserComment.find();
    res.send(commentresult)
}

// Deleting Rating of User

export const authratingDeleteController = async (req, res) => {
    try {
        let Data = await UserComment.deleteOne({ _id: req.params.id })
        if (Data) {
            return res.status(201).send({
                success: true,
                message: "Deleted Record"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(501).send({
            success: false,
            message: "No Record Avaiable"
        })
    }
};