const express = require("express");
const app = express();

const users = []

app.get("/users", (req,res) => {
  res.json(users)
}) 

app.post("/users/:id", (req,res) => {
  
})

app.listen(3000);