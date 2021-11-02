const {MongoClient} = require("mongodb")

async function main(){
 const url = "mongodb+srv://ali:ali7676@cluster0.ozphx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 const client = new MongoClient(url);
 try{
    await client.connect();
    await addManyProducts(client,[
            {
                _id : "oppo-f20",
                name: "oppo f20",
                image: "image2.jpg",
                category: "electronics",
                purchase_price: 30, 
                selling_price: 40,
                quantity: 50,
                company: "oppo"
            },
            {
                _id : "banana1",
                name: "banana",
                image: "image1.jpg",
                category: "fruits",
                purchase_price: 30, 
                selling_price: 40,
                quantity: 50,
                company: "Sawat",
                expiry_date: 2021-10-12
            },
            {
                _id : "juice32",
                name: "Juice",
                image: "image1.jpg",
                category: "fruits",
                purchase_price: 30, 
                selling_price: 40,
                quantity: 50,
                company: "Shan",
                expiry_date: 2021-10-12
            },
        ])
 }catch(e){
     console.log(e);
 }finally{ 
     await client.close();
 }
}
main().catch(console.error);

async function deleteManyProducts(client,item){
    const result = await client.db("online_mangement_system").collection("products").deleteMany({name:item})
    console.log(`Delete Fields: ${result.deletedCount}`)
}

async function deleteProduct(client,item){
    const result = await client.db("online_mangement_system").collection("products").deleteOne({name:item})
    console.log(`Delete Fields: ${result.deletedCount}`)
}

async function updateAllProductsProperty(client){
    const result = await client.db("online_mangement_system").collection("products").updateMany({category:{$exists:false}}, {$set:{category:"Unknown"}})
    console.log(`Match count: ${result.matchedCount}`)
    console.log(`Modified Fields: ${result.modifiedCount}`)
}

async function upsertProduct(client,name,newName){
    const result = await client.db("online_mangement_system").collection("products").updateOne({name:name},{$set:newName},{upsert: true})
    console.log(`Match count: ${result.matchedCount}`)
    if(result.upsertedCount > 0){
        console.log(`Product insert with ID ${result.upsertedId}`)
    }else{
        console.log(`Modified Fields: ${result.modifiedCount}`)
    }
}

async function updateProduct(client,name,newName){
const result = await client.db("online_mangement_system").collection("products").updateOne({name:name},{$set:newName})
console.log(`Match count: ${result.matchedCount}`)
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
 // setGetData([{
                //     _id:45645658,
                //     date:"2022-10-2",
                //     time:"07:45:50",
                //     total_amount:1000,
                //     products:[
                //         {
                //             _id:928372,
                //             name:"Product1",
                //             quantity:1312,
                //             selling_price:7000
                //         }
                //     ]
                // },{
                //     _id:45645659,
                //     date:"2022-10-3",
                //     time:"07:45:50",
                //     total_amount:2000,
                //     products:[
                //         {
                //             _id:928372,
                //             name:"Product2",
                //             quantity:1312,
                //             selling_price:7000
                //         },{
                //             _id:928372,
                //             name:"Product4",
                //             quantity:1312,
                //             selling_price:7000
                //         }
                //     ]
                // },{
                //     _id:45645660,
                //     date:"2022-10-4",
                //     time:"07:45:50",
                //     total_amount:4000,
                //     products:[
                //         {
                //             _id:928372,
                //             name:"Product3",
                //             quantity:1312,
                //             selling_price:7000
                //         }
                //     ]
                // },{
                //     _id:45645661,
                //     date:"2022-10-5",
                //     time:"07:45:50",
                //     total_amount:5000,
                //     products:[
                //         {
                //             _id:928372,
                //             name:"Product4",
                //             quantity:1312,
                //             selling_price:7000
                //         }
                //     ]
                // },{
                //     _id:45645659,
                //     date:"2022-10-3",
                //     time:"07:45:50",
                //     total_amount:2000,
                //     products:[
                //         {
                //             _id:928372,
                //             name:"Product2",
                //             quantity:1312,
                //             selling_price:7000
                //         },{
                //             _id:928372,
                //             name:"Product4",
                //             quantity:1312,
                //             selling_price:7000
                //         }
                //     ]
                // },{
                //     _id:45645659,
                //     date:"2022-10-3",
                //     time:"07:45:50",
                //     total_amount:2000,
                //     products:[
                //         {
                //             _id:928372,
                //             name:"Product2",
                //             quantity:1312,
                //             selling_price:7000
                //         },{
                //             _id:928372,
                //             name:"Product4",
                //             quantity:1312,
                //             selling_price:7000
                //         }
                //     ]
                // }]);
//[
    //     {
    //     _id:1,name:"Lays",
    //     selling_price:234,
    //     purchase_price:300,
    //     category:"A",
    //     quantity:300
    // },
    // {
    //     _id:2,name:"Oppo",
    //     selling_price:7634,
    //     purchase_price:300,
    //     category:"B",
    //     quantity:123
    // },
    // {
    //     _id:3,name:"Apple",
    //     selling_price:98734,
    //     purchase_price:300,
    //     category:"C",
    //     quantity:3242
    // },
    // {
    //     _id:4,name:"Nike",
    //     selling_price:456734,
    //     purchase_price:300,
    //     category:"D",
    //     quantity:9830
    // },
    // {
    //     _id:5,name:"Product5",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"E",
    //     quantity:12330
    // },  {
    //     _id:6,name:"Product6",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"F",
    //     quantity:30
    // },  {
    //     _id:7,name:"Product7",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"G",
    //     quantity:30
    // },  {
    //     _id:8,name:"Product8",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"H",
    //     quantity:30
    // },  {
    //     _id:9,name:"Product9",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"I",
    //     quantity:30
    // },  {
    //     _id:10,name:"Product10",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"J",
    //     quantity:30
    // },  {
    //     _id:11,name:"Product11",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"K",
    //     quantity:30
    // },
    // {
    //     _id:12,name:"Product12",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"L",
    //     quantity:30
    // },
    // {
    //     _id:13,name:"Product13",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"M",
    //     quantity:30
    // },
    // {
    //     _id:14,name:"Product14",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"N",
    //     quantity:30
    // },
    // {
    //     _id:15,name:"Product15",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"O",
    //     quantity:30
    // },  {
    //     _id:16,name:"Product16",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"P",
    //     quantity:30
    // },  {
    //     _id:17,name:"Product17",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"Ali",
    //     quantity:30
    // },  {
    //     _id:18,name:"Product18",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"Akbar",
    //     quantity:30
    // },  {
    //     _id:19,name:"Product19",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"Usama",
    //     quantity:30
    // },  {
    //     _id:20,name:"Product20",
    //     selling_price:34,
    //     purchase_price:300,
    //     category:"ahmed",
    //     quantity:30
    // }
//]
//await deleteManyProducts(client,"apple")
//await deleteProduct(client,"watch")
//await updateAllProductsProperty(client)
// await upsertProduct(client,"Watch",{company:"Apple",selling_price:30000,purchase_price:45000,image:"imag2.png"})
//await updateProduct(client,"apple",{company:"Gilgit"})
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