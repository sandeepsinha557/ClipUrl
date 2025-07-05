const User = require('../models/user')
const {v4:uuidv4} = require('uuid')
const { setUser } = require('../service/auth')

async function handleUserSignup(req,res){
    const{name,email,password}=req.body;

    try{
        const existing=await User.findOne({email});
        if(existing){
            return res.render("signup", {error:"Email already registered."});
        }

        const user=await User.create({
            name,
            email,
            password,
        });

        const token=setUser(user);
        res.cookie("token", token);

        return res.redirect("/");
    }catch(err){
        console.error("Signup Error:", err);
        return res.render("signup",{
            error: "Signup failed. Try again with different email.",
        });
    }
}


async function handleUserLogin(req ,res){
    const { email , password} = req.body;

    const user = await User.findOne({email , password});
    if(!user) return res.render("login" , {
        error:"Invalid Username or Password",
    });

    
    const token = setUser(user);
    res.cookie("token",token);
    return res.redirect("/");
    
}

module.exports = {
    handleUserSignup,
    handleUserLogin
    
};