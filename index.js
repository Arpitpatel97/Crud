let express = require('express');
const { dbConnection } = require('./dbConnection');
const { ObjectId } = require('mongodb');
let app = express();

app.use(express.json());
// 1.insert 2.read 3.update 4.delete
//4 urls bnane pdenge 

//2.
app.get("/student-read", async (req, res) => {
    let mydb = await dbConnection();
    let studentCollection = mydb.collection("students");
    let data = await studentCollection.find().toArray();
    res.send(data);
    let resobj = {
        status: 1,
        msg: "student read",
        data
    };
});

//1.
app.post("/student-insert", async (req, res) => {
    let mydb = await dbConnection();
    let studentCollection = mydb.collection("students");
    let obj = {
        sname: req.body.sname,
        semail: req.body.semail,
    };
    let insertRes = await studentCollection.insertOne(obj);
    let resobj = {
        status: 1,
        msg: "student inserted",
        insertRes,
    };
    res.send(resobj);
});

//3.
app.delete("/student-delete/:id?", async (req, res) => {
    let { id } = req.params;
    let mydb = await dbConnection();
    let studentCollection = mydb.collection("students");
    let deleteres = await studentCollection.deleteOne({ _id: ObjectId(id) });
    let resobj = {
        status: 1,
        msg: "student deleted",
        deleteres
    };
    res.send("api");
});


app.listen("8000");