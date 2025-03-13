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
    let deleteres = await studentCollection.deleteOne({ _id: new ObjectId(id) });
    let resobj = {
        status: 1,
        msg: "student deleted",
        deleteres
    };
    res.send(resobj);
});


//4.
app.put("/student-update/:id", async (req, res) => {
    
      const {id}=req.params;
      let  {sname,semail}=req.body;
      let mydb=await dbConnection();
      let studentCollection=mydb.collection("students")

      let checkemail=studentCollection.findOne(semail);
      if(checkemail){
        return res.send({status:1,msg:"email already exists"});
      }





      let obj={}
      if(sname) obj.sname=sname;
      if(semail) obj.semail=semail;
      
      let updateres=await studentCollection.updateOne({_id: new ObjectId(id)}, {$set: obj}); 
        let resobj={
            status:1,
            msg:"student updated",
            updateres
        }
        res.send(resobj);
})


app.listen("8000");