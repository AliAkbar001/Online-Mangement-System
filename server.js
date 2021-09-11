const express = require('express')
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const BodyParser = require("body-parser");
const CONNECTION_URL = "mongodb+srv://ali:ali7676@cluster0.ozphx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE_NAME = "online_mangement_system";

const app = express()
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.get("/api/products", async (req, res) => {
res.header("Access-Control-Allow-Origin", "*");
const result = await collection.find({}).toArray();
res.send(result)
})

app.listen(5001, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("products");
        console.log(`Server is start http://localhost:5001/`);
    });
});