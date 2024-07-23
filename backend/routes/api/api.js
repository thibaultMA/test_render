import express from "express"
import { isEmpty } from "../../utils/utils.js";
import { findInCache } from "../../controller/cache.js"
import { throwCustomMessage } from "../../utils/error.js";
import { stripeCekoutSessionCreate, stripeCekoutSessionRetrive } from "../../controller/stripeController.js";

export const apiRouter = express.Router()



.post("/command",(req,res)=> {
    
    let produitBody = []
    req.body.forEach(element => {
        let produit = findInCache(element.id)
        // console.log(produit);
        produit.quantite = element.quantite
        produitBody.push(produit)
    });
    if(produitBody.length == 0 ) {
        throwCustomMessage(400,res,{message:"le panier est vide"})
        return
    }
    let total = produitBody.reduce((sum,item)=> sum += (item.valeur.prix * item.quantite),0).toFixed(2) 
    console.log(total);
    res.json({
        total,produitBody
    })
    // res.redirect('/confirm')
})

.post('/create-checkout-session', async (req, res) => {
    let commande = []
    req.body.forEach(element => {
        let e = findInCache(element.id)
        if (e != null){
            let price = e.valeur.prix *100
            let o = {
                price_data: {

                    currency: 'eur',
                    product_data: {
                    name: e.valeur.nom,
                    },
                    unit_amount: price,
                },
            quantity: element.quantite,
            }
            commande.push(o)
        }
    });

    const session = await stripeCekoutSessionCreate(commande);
  
    res.send({clientSecret: session.client_secret});
  })

.get('/session-status', async (req, res) => {
    const session = stripeCekoutSessionRetrive(req);

    res.send({
        status: session.status,
        customer_email: session.customer_details.email
    });
});
 