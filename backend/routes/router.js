import express from "express"
import {cache} from "../controller/cache.js";
import {apiRouter} from "./api/api.js";
import { checkBody } from "../middleware/checkBody.js";
import { adminRouter } from "./admin/admin-router.js";

export const routers = express.Router()
.use("/adm",adminRouter)

.get("/",(req,res)=>{
    res.render("tt",{"toto":cache,"title":"titre"})
})
.get("/plein",(req,res)=>{
    cache.entree.push(cache.entree[0])
    cache.plats.push(cache.plats[0])
    cache.dessert.push(cache.dessert[0])
 
    res.render("tt",{"toto":cache,"title":"titre"})
})

.get('/payement',(req,res)=>{
    res.render('payement')
        
})
.post("/adm",adminRouter)
.use('/api',checkBody,apiRouter)

 