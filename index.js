const express = require('express');
const cors = require('cors');
require ('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app =express();
const port =process.env.PORT || 5000 ;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njuiq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const bikeCollection =client.db('emonbikes').collection('bike');
                      
      
        app.get('/bike',async(req,res)=>{
              const query={};
              const cursor=bikeCollection.find(query)
              const bikes =await cursor.toArray()
              res.send(bikes)
        });

        app.get('/bike/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id:  ObjectId(id)}
            const bike = await bikeCollection.findOne(query) 
           res.send(bike)
        })
    //  post items

    app.post('/bike', async(req,res)=>{
       const newBike = req.body
      const result =await bikeCollection.insertOne(newBike)
      res.send(result);

      });

    // put items
    app.put('/bike/:id',async(req,res)=>{
      const id =req.params.id;
      const updateItems= req.body;
      const quantity =updateItems.newQuantity
      const filter ={_id:ObjectId(id)};
      const option ={upsert:true}
      const upadateDoc ={
        $set:{
          quantity:quantity
        }
      }
      const result= await bikeCollection.updateOne(filter,upadateDoc,option)
      res.send(result)
    })



            //        delete

            app.delete('/bike/:id',async(req,res)=>{
              const id =req.params.id
              const query ={_id:ObjectId(id)}
              const result =await bikeCollection.deleteOne(query)
              res.send(result)
          });

    //deploy to heroku main
     app.get('/emon',(req,res)=>{
       res.send('heroku done')
     });
    //  https://intense-citadel-51923.herokuapp.com/
    }
  finally{

  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Runing Server')
})


app.listen(port,()=>{
    console.log('Listing to port',port)
})