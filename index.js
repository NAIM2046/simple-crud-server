const express = require('express')
const cors = require('cors') ;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express() ;
const port = process.env.PORT|| 5000 ; 
app.use(cors()) ;
app.use(express.json()) ; 
// nmd98911 
//bpTnpuERhGBf8QFd



const uri = "mongodb+srv://nmd98911:bpTnpuERhGBf8QFd@cluster0.hfxak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("userBD");
    const movies = database.collection("users");
     app.get('/users' ,async(req , res)=>{
      const cursor = movies.find() 
      const result = await cursor.toArray() ;
      res.send(result) ;
     })

     app.get('/users/:id' , async(req , res)=>{
      const id =  req.params.id ;
      const query = {_id: new ObjectId(id)} ;
      const user = await movies.findOne(query) ;
      res.send(user) ;
     })

     app.post('/users' ,async(req , res) =>{
      const user = req.body ; 
      console.log(user) ; 
      const result = await movies.insertOne(user);
      res.send(result)
     })
     app.put('/users/:id' , async(req , res) =>{
      const id = req.params.id ; 
      const user = req.body ;
      console.log(id , user) ;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true} 
      const updatedUser = {
        $set : {
          name: user.name ,
          email : user.email ,
        } 
      }
      const result =  await movies.updateOne(filter , updatedUser , options)
      res.send(result)

     })

     app.delete('/users/:id', async(req , res)=>{
       const id = req.params.id
       console.log('please delete from database',id) ;
        const query = {_id:new ObjectId(id) }
         const result = await movies.deleteOne(query) ; 
         res.send(result)
     })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);



app.get('/' , (req , res) =>{
    res.send("Simple crud is runing on port")
})
app.listen(port , ()=>{
    console.log(`simple crud is runing on port ${port}`) 
})