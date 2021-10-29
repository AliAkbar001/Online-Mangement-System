const express = require('express')
const path = require('path')
const MongoClient = require("mongodb").MongoClient;
const BodyParser = require("body-parser");
const CONNECTION_URL = "mongodb+srv://ali:ali7676@cluster0.ozphx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE_NAME = "online_mangement_system";
const multer = require('multer')
var getFilename = "none";
const storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, './images')
    },
    filename: function(req,file,cd){
        cd(null, file.originalname.split(' ').join('_'));
        getFilename = file.originalname;
    } 
})
const upload = multer({storage:storage});
const app = express()
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
var database, productCollection;

app.get("/api/products", async (req, res) => {
const result = await productCollection.find({}).sort({$natural:-1}).toArray();
res.send(result)
})

app.get("/api/products/image/:name", async (req, res) => {
    res.sendFile(path.join(__dirname,`./images/${req.params.name}`))
    })


app.post("/api/products", upload.single('product_image'),async (req, res) => {

    const name = req.body.name===''?"none":req.body.name;
    const category = req.body.category===''?"none":req.body.category;
    const purchase_price = req.body.purchase_price===''?0:parseInt(req.body.purchase_price);
    const selling_price = req.body.selling_price===''?0:parseInt(req.body.selling_price);
    const quantity = req.body.quantity===''?0:parseInt(req.body.quantity);
    const company = req.body.company===''?"none":req.body.company;
    const expiry_date = !req.body.expiry_date?"none":req.body.expiry_date;
    const action = req.body.action;

    var product = {
        _id: req.body._id,
        name: name,
        category:category,
        purchase_price:purchase_price,
        selling_price:selling_price,
        product_image:getFilename.split(' ').join('_'),
        quantity:quantity,
        company:company,
        expiry_date:expiry_date,
    }
    if(action === "add"){
        product = {...product,sold_quantity:0}
        await productCollection.insertOne(product,function(err, data) {
            if (err) {
                res.send(err) 
              } else {
                res.send(data)
              }
        });
    }else if(action === "update"){
        await productCollection.updateOne({_id:req.body._id},{$set:product},function(err, data) {
            if (err) {
                res.send(err) 
              } else {
                res.send(data)
              }
        });
    }
   
})

app.delete("/api/products/:id", async (req, res) => {
    var msg = { }
    const result = await productCollection.deleteOne({_id:req.params.id})
    if(result.deletedCount>0){
        msg = {delete:"Product Delete Successfully"}
        res.send(msg)
    }else{
        msg = {delete:"Error Found"}
        res.send(msg)
    }
    })

    app.post("/api/bill", async (req, res) => {
        if(req){
            var data = req.body;
            var totalAmount = 0;
            data.map(a => totalAmount = totalAmount + a.selling_price);
            var today = new Date();
            var date = today.getFullYear() + '-'+(today.getMonth()+1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var bill = {
                date: date,
                time: time,
                products: data,
                total_amount: totalAmount
            };
             database.collection('bill').insertOne(bill,function(err1, data1) {
                if (err1) {
                    res.send(err1) 
                  } else {   
                data.map((a)=>(
                    productCollection.updateOne({_id:a._id},{$inc:{sold_quantity: a.quantity, quantity:-a.quantity}},function(err2, data2) {
                        if (err2) {
                            res.send(err2) 
                        } else {
                            bill = {_id:data1.insertedId,...bill}
                            const response = {bill,data2}
                            var dailyData = {
                                date:date,
                                day:today.getDate(),
                                month:today.getMonth()+1,
                                year:today.getFullYear(),
                                billData:[{
                                    _id:data1.insertedId,
                                    total_amount:totalAmount
                                }],
                                total_amount:totalAmount
                           }
                            database.collection('day').updateOne({date:date},{
                                $push:{billData:{_id:data1.insertedId,total_amount:totalAmount}},$inc:{total_amount:+totalAmount}
                            },function(err3, data3) {
                                if (err3) {
                                    res.send(err3) 
                                } else {
                                    if(data3.modifiedCount === 0){
                                         database.collection('day').insertOne(dailyData);
                                    }
                                     res.send(response);
                                }
                            });
                            
                        }
                    })
               ))
            }
        });
        
        }
    })
      
app.listen(5001, () => {
    MongoClient.connect(CONNECTION_URL, { 
        useNewUrlParser: true}, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        productCollection = database.collection("products");
        console.log(`Server is start http://localhost:5001/`);
    });
});