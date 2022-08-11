const mongoose = require("mongoose");

const connection_url = process.env.DB_URL;

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