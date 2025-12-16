const {connect}=require("mongoose");
const db_connect=async ()=>{
    try{
        await connect(process.env.MONGO_CRED);
        console.log("Database Connected");
    }catch(error){
        console.log(error);
    }
}
module.exports=db_connect;