const {Schema,model}= require("mongoose");
const mongoose=require("mongoose");
const schema=new Schema({

    count:{type:Number,default:0,required:true},
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"resources"
    }
});
const Download=model("download",schema);
module.exports=Download;
