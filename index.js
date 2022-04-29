const express = require('express');
const cors = require('cors');
require ('dotenv').config();
const app =express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rkxze.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{
 await client.connect()
 const bikecollection = client.db("bikewarehouse").collection("bike");
}
finally{

}
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('Runing Server')
})


app.listen(port,()=>{
    console.log('Listing to port',port)
})