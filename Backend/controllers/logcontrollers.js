const Log=require("../model/log");
const insert=async(req,res)=>{
    console.log(req.body);
    try{
        const log=new Log({
            type:req.body.type,
            name:req.body.name
        });
        await log.save();
        res.status(201).send("Log Updated");
    }catch(err){
        res.status(400).json({error:err.message});
    } 
}
const get=async(req,res)=>{
    try{
        const log=await Log.find().sort({date:-1});
        res.json(log);
    }catch(err){
        res.status(400).json({error:"Unable to fetch history!"});
    }
}
module.exports={insert,get};