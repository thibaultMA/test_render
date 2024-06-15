import { cache } from "../controller/cache.js";
import { db } from "../firebase.js";


const collection_firebase = 'personne';

export async function getAll() {
    if (cache.length != 0) {
        return cache
    }
    let bdd = []
    let collection = db.collection(collection_firebase)
    let prod =  await collection.get()
    prod.forEach(e=>bdd.push(e.data()))
    return bdd
}

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