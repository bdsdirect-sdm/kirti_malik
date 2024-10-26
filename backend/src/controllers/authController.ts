import { Request,Response } from "express";
import Retailer from "../models/retailer.model";
import Product from "../models/product.model";
import { sendWelcomeEmail } from "../config/mailer";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';
import { where } from "sequelize";



export const registerRetailer = async (req: any, res: any) => {
    console.log('hello');

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    try {
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(password, 10);
        
       
        const user = {        
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            companyName: req.body.companyName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            companyLogo: req.files['companyLogo'][0].path,
            profileImage: req.files['profileImage'][0].path,
            
            password: hashedPassword,
        };
        
        console.log('Received files:', req.files);
        console.log('Body:', req.body);

       
        const newUser = await Retailer.create(user);
        console.log("newUser==", newUser);
        await sendWelcomeEmail(newUser.email, password);
        return res.status(201).json({ message: "retailer added successfully", user: newUser });

    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ message: "Server error", error });
    }
};




export const loginUser = async (req: any, res: any) => {
    try {
        console.log('User login initiated');
        const { email, password } = req.body;

        const user = await Retailer.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, 'kirti', {
            expiresIn: '1h',
        });

        const response = {
            token,
            user
        };

        console.log('retailer==========',response)

        res.status(200).json(response);

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

//listing of the products on retailer dashboard
export const getProduct=async(req:any,res:any)=>{
     try {    
    const products = await Product.findAll({ where: { retailerId: req.params.retailerId, deleted:false } });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

//to add any new product
export const addProduct = async (req: any, res: any) => {
  console.log("hello");
  try {
    const retailerId = req.params.retailerId;

    
    if (!retailerId) {
      return res.status(400).json({ message: "Retailer ID is required." });
    }

   
    if (!req.files || !req.files['image']) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const product = await Product.create({
      name: req.body.name,
      image: req.files['image'][0].path,
      quantity: req.body.quantity,
      price: req.body.price,
      status: req.body.status || 'draft',
      retailerId: retailerId,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error during product addition:", error); // Log the actual error
    return res.status(500).json({ message: "Server error", error });
  }
};

//to view the product on seperate page
export const productDetails=async(req:any,res:any)=>{
  try{
    const product=await Product.findOne({where:{id:req.params.productId}});
    return res.status(200).json(product);
  }
  catch(error){
    return res.status(500).json({message:"server error",error})
  }

}

//to delete the product from the list

export const deleteProduct = async (req: any, res: any) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    product.deleted = true; 
    await product.save();

    return res.status(200).json({ message: "Product soft deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//to get the info of retailer using their id

export const getRetailer=async(req:any,res:any)=>{
  const retailerId=req.params.retailerId;

  try{
    const retailer=await Retailer.findOne({where:{id:retailerId}});
    return res.status(200).json(retailer);
  }
  catch(error)
  {
    return res.status(500).json({message:"server error",error})
  }

}