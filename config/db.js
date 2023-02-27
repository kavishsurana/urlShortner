const mongoose = require("mongoose")
const config = require("config")

//const db = config.get("mongodbUrl")

// const connectDb = async () => {
//     try{
//         await mongoose.connect(db, {
//             useNewUrlParser : true
//         })
    
//     console.log("MongoDb connected.....")

//     }catch(err){
//         console.log("cannot be mongodb. Existing application startup.")
//         console.log(err)
//         process.exit(-1)
//     }
// }


module.exports = connectDb;