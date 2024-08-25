import { sortToCache } from "../controller/cache.js";
import { db } from "../firebase.js";


const collection_firebase = 'personne';


export async function deletAll(id) {
    let collection = db.collection(collection_firebase)
    let listPersonne = await collection.where("id","==",id).get()
}
export async function add(produit) {
    // console.log(produit.export());
    let collection = await db.collection(collection_firebase).add(produit.export())
    produit.id = collection.id
    let res  =  db.collection(collection_firebase).doc(produit.id)
    res.update(produit.export())
}

export async function getAllProduits() {
    let testBDDD= {}

    let collections = db.collection("produits")

    let prod =  await collections.get()
    
    prod.forEach(async (e)=>{
        let champsID = e.data().nom

        let tt = await extractData(e)
        tt.nom = champsID
        testBDDD[champsID] = tt
  
        sortToCache(testBDDD)
        
    })
    return testBDDD
}


async function extractData(e) {
    let champCollection = db.collection("produits").doc(e.id).collection("prop")
    let champsAttr =  await champCollection.get()

    let listChamps = {
        ordre: e.data().ordre,
        list: [ ]
    }

    champsAttr.forEach(o=> {
        let oData = o.data()
        oData.id = o.id
        // console.log(oData);
        listChamps.list.push(oData)
    })

    return listChamps
}