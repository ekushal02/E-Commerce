const mongoose = require("mongoose");

const connection_url = "mongodb+srv://ekushal02:02098688282386kY@cluster0.et9musx.mongodb.net/?retryWrites=true&w=majority"
||process.env.DB_URL;

const connectDatabase = ()=>{

    mongoose.connect(connection_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.log(err)
    })
};

module.exports = connectDatabase;