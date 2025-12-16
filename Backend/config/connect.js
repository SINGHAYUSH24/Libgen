const {connect}=require("mongoose");
const db_connect=async ()=>{
    try{
        await connect(`mongodb+srv://viciousflagbearer:hastalavista@cluster0.tbvnip2.mongodb.net/Libgen`);
        console.log("Database Connected");
    }catch(error){
        console.log(error);
    }
}
module.exports=db_connect;