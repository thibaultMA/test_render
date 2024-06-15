import express from "express"
import { cache } from "../../controller/cache.js"
export const apiRouter = express.Router()

.post("/command",(req,res)=> {
    
    let produitBody = []
    req.body.forEach(element => {
        let produit = cache.find(el=>el.id==element.id)
        produit.quantite = element.quantite
        produitBody.push(produit)
    });
    
    let total = produitBody.reduce((sum,item)=>sum += (item.prix * item.quantite),0).toFixed(2)

    res.json({
        total,produitBody
    })
    // res.redirect('/confirm')
})


 