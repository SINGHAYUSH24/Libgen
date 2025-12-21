const express = require("express");
const router = express.Router();
const { searchResources,toggleBookmark} = require("../controllers/searchcontrollers");
const {protect}=require("../middleware/authMiddleware");
const User=require("../model/User");
router.get("/search", searchResources);
router.post("/bookmark/:id",protect,toggleBookmark);
router.put("/update/:id",async(req,res)=>{
    try{
        const formdata={
        name:req.body.name,
        email:req.body.email
    }
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const updated=await User.findByIdAndUpdate(
        req.params.id,
        formdata,
        {
        new: true,
        runValidators: true
    });
    if(!updated){
        return res.status(401).json({message:"Could Not Update!"});
    }
    return res.json({message:"Updated Successfully",data:updated});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
});
router.put("/change/:id",async(req,res)=>{
    try{
        const newpass={
        password:req.body.pass
    }
    const id=req.params.id;
    const user=await User.findById(id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    user.password = req.body.pass;
    await user.save();
    return res.json({message:"Password Updated"});
    }catch(error){
        return res.status(500).json({message:"Server Erorr"});
    }
});
module.exports = router;
