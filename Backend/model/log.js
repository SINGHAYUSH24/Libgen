const {Schema,model}=require("mongoose");
const LogSchema=new Schema({
    type:{type:String,trim:true,required:true},
    name:{type:String,trim:true,required:true},
    date:{type:Date,default:Date.now,required:true}
});
const Log=model("Log",LogSchema);
module.exports=Log;
