import path,{dirname} from "path"
import { fileURLToPath } from "url"
import { Produit } from "../models/Produit.js"
import { getAllProduits } from "../service/BddService.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export let cache = []

export async function startCache() { 

    cache = await getAllProduits()
    console.log("le cache à bien été lancer ");
    
}

export async function sortToCache(item) { 
    const entree = Object.entries(item)
    entree.sort(([key,value],[key2,value2])=>{
        return value.ordre - value2.ordre
    })
    const sortedCollection = Object.fromEntries(entree);

    for (const key in sortedCollection) {
        if (Object.hasOwnProperty.call(sortedCollection, key)) {
            let element = sortedCollection[key];
            sortedCollection[key]= element.list
        }
    }
    cache = sortedCollection
}
export function findInCache(id) {
    let cible;
    for (const key in cache) {
        let t = cache[key].find(prod=>prod.id == id)
        if (t){
            cible = {
                key,
                valeur:t
            }
        }
    }
    return cible
}

