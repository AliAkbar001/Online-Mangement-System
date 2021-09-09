const {MongoClient} = require("mongodb")

async function main(){
 const url = "mongodb+srv://ali:ali7676@cluster0.ozphx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 const client = new MongoClient(url);
 try{
    await client.connect();
    await updateProduct(client,"apple",{company:"Gilgit"})
 }catch(e){
     console.log(e);
 }finally{ 
     await client.close();
 }
}
main().catch(console.error);

async function updateProduct(client,name,newName){
const result = await client.db("online_mangement_system").collection("products").updateOne({name:name},{$set:newName})
console.log(`Match count: ${result.matchCount}`)
console.log(`Modified Fields: ${result.modifiedCount}`)
}

async function searchProduct(client,item){
    const result = await client.db("online_mangement_system").collection("products").findOne({name:item})
    if(result){
        console.log(result)
    }else{
        console.log("Result not found")
    }
}
async function productQuantity(client,quantity){
    const cursor = client.db("online_mangement_system").collection("products").find({quantity:{$lte:quantity}})
    const result = await cursor.toArray();
    if(result.length > 0){
        result.forEach((result)=>{
            console.log(`_id:${result._id}`)
            console.log(`name:${result.name}`)
            console.log(`quantity:${result.quantity}`)
            console.log("--------")
        })
    }

}
async function addProduct(client,newItem){
    const result = await client.db("online_mangement_system").collection("products").insertOne(newItem)
    console.log(result.insertedId)
}
async function addManyProducts(client,newItems){
    const result = await client.db("online_mangement_system").collection("products").insertMany(newItems)
    console.log(result.insertedIds)
}
async function databasesList(client){
    const dbList = await client.db().admin().listDatabases();
    dbList.databases.forEach(db => {
        console.log(db.name)
    });
}
//await databasesList(client);
    // await addProduct(client,{
    //     _id : "apple1",
    //     name: "apple",
    //     image: "image1.jpg",
    //     category: "fruits",
    //     purchase_price: 30, 
    //     selling_price: 40,
    //     quantity: 50,
    //     company: "Sawat",
    //     expiry_date: 2021-10-12
    // })
    // await addManyProducts(client,[
    //     {
    //         _id : "oppo-f19",
    //         name: "oppo f19",
    //         image: "image2.jpg",
    //         category: "electronics",
    //         purchase_price: 30, 
    //         selling_price: 40,
    //         quantity: 50,
    //         company: "oppo"
    //     },
    //     {
    //         _id : "apple2",
    //         name: "apple",
    //         image: "image1.jpg",
    //         category: "fruits",
    //         purchase_price: 30, 
    //         selling_price: 40,
    //         quantity: 50,
    //         company: "Sawat",
    //         expiry_date: 2021-10-12
    //     },
    //     {
    //         _id : "apple3",
    //         name: "apple",
    //         image: "image1.jpg",
    //         category: "fruits",
    //         purchase_price: 30, 
    //         selling_price: 40,
    //         quantity: 50,
    //         company: "Sawat",
    //         expiry_date: 2021-10-12
    //     },
    // ])
   // await searchProduct(client,"apple")
  // await productQuantity(client,50)