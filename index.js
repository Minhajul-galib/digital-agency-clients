const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();
// const admin = require("firebase-admin");
const cors = require('cors');

const app = express()
// const fileUpload = require('express-fileupload');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cs9gj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const uri = 'mongodb+srv://DagencyBD:SqOdjb21LaLMD5y2@cluster0.cs9gj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        console.log('database connected');
        const database = client.db('Digital_Agency_BD');
        const userCollection = database.collection('user');
        

        // ok TEST!
        app.get('/ok', (req, res)=>{
            res.send('ok got it')
        })


// USER!
        // USER!
        app.get('/users', async (req, res)=>{
            const user = userCollection.find({});

            const allUser = await user.toArray();

            res.send(allUser);
        });


    }
    finally{
        // await client.close()
    }
}

run().catch(err=>(console.log(err)))

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log('ITs ok');
})
