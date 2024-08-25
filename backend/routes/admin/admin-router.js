import express from "express"
export const adminRouter = express.Router()

.get('/login',(req,res)=>{
    res.render("login")
})
.post('/login',(req,res)=>{
    console.log(req.body);
    res.send(200)
})