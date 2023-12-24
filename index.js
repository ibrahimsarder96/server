const express = require('express');
const cors = require('cors');
// require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middle ware
app.use(cors());
app.use(express.json());

// mongodb connection----------
const uri = `mongodb+srv://classic-it:SES5PdXX8rJh62Vp@classic.khvypwe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, }});

async function run () {
  try{
    await client.connect();
    const productCollection = client.db('storage').collection('products');
    app.get('/products', async(req, res) => {
      const query = {}
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
      // single product load------------
      app.get('/products/:id', async(req, res) =>{
        const id = req.params.id;
        console.log(id)
        const query={_id: ObjectId(id)};
        const product = await productCollection.findOne(query);
        res.send(product);
      });
    }
  catch{

  }
};
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is Running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})