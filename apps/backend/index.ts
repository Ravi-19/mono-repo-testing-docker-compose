import express from "express";
import { prismaClient } from "db/client";

const app = express();

//app.use(express.urlencoded({ extended: true })); // cause

app.get('/' , (req , res) => {
  res.send("server is working fine") ; 
})

app.get("/users",async (req, res) => {
  await  prismaClient.user.findMany()
    .then(users => {
      res.json({users});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})
app.use(express.json());

app.post("/user", async(req, res) => {
  
   const { username, password } = req.body;
  
  // const username = req.body ; 
  // const password = req.body ; 
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

 await prismaClient.user.create({
    data: {
      username,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080 , ()=> {
  console.log("server is litening on port 8080") ; 
});