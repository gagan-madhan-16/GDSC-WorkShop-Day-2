const { Router } = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = Router();
const { User } = require("../db");

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

app.post("/signup", async (req,res) => {
    try {
        const {name,password,email} = req.body;
    
        if (!name || !password || !email) 
        {
            return res.status(400).json({ 
                errors: "no fields can be empty"
            });
        } 
        else 
        {
            const existingUser = await User.findOne({ email : email});
        
            if (existingUser) 
            {
                return res.status(411).json({
                    msg: "Email already taken",
                });
            }
            else
            {
                const encpswd = await bcrypt.hash(password, 10);
                
                await User.create({
                    name:name,
                    password:encpswd,
                    email:email
                });
                
                res.status(200).json({
                    msg: "User created successfully"
                });


            }
        }
    
    } catch (error) {
        res.status(500).json({
            msg:"internal server error try again later",
            error:error
        });
    }
});

app.post('/signin', async (req,res) => {
    try {
        const {email,password} = req.body;
    
        if (!email || !password) 
        {
            return res.status(400).json({ 
                errors: "no fields can be empty"
            });
        } 
        else 
        {
            const user = await User.findOne({ email : email});
            if (user && await bcrypt.compare(password, user.password)) 
            {
                const userId = user._id, name = user.name;
                const token = jwt.sign({ userId, name }, JWT_SECRET);
                
                return res.status(200).json({
                    msg: "Sign-in successful",
                    token: token,
                });
            }
    
            res.status(401).json({
                msg: "Invalid email or password",
            });
        }
    } catch (error) {
        res.status(500).json({
            msg:"internal server error try again later",
            error:error
        });
    }
});

module.exports = app;