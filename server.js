const express = require('express');
const app = express();
// routes
app.get("/", (req,res)=>{
    res.send('Send my first request')
})
app.listen(3000, ()=> console.log("Local Server Started"));