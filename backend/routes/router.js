import express from "express"
import {cache} from "../controller/cache.js";
import {apiRouter} from "./api/api.js";
import { checkBody } from "../middleware/checkBody.js";

export const routers = express.Router()

.get("/",(req,res)=>{
    res.render("tt",{"toto":cache,"title":"titre"})
})
.get('/confirm',(req,res)=>{
    res.render("confirm",)
})

.use('/api',checkBody,apiRouter)

 