import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import userSchema from "../models/userModel.js";

export const registerControllers = async (req, res)=>{
    try {
        const {fname, email, phone, password, address} = req.body;

        // validation
        if(!fname, !email, !phone, !password, !address){
            return res.send({message: "Fill all fields"})
        }

        const existinguser = await userSchema.findOne({email})

        if(existinguser){
            return res.status(200).send({
                success: false,
                message: "This email already exist. use diffrent email"
            })
        }

        // Hashed Password
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new userModel({fname, email, phone, password:hashedPassword, address}).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user
        })

    } catch (error) {
        console.log(`Error in data save ${error}`)
    }
}