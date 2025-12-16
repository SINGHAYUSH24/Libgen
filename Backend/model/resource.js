const {Schema,model}=require("mongoose");
const ResourceSchema=new Schema({
    title:{type:String,trim:true,required:true},
    authors: [String],
    category: String,
    keywords: [String],
    publication_year: Number,
    availability: { type: Number, default: 1 },
    pdf_path: { type: String, required: true }
},{
    timestamps:true,
});
const Resource=model("Resource",ResourceSchema);
module.exports=Resource;