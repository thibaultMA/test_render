import path,{dirname} from "path"
import { fileURLToPath } from "url"
import { Produit } from "../models/Produit.js"
import { getAll } from "../service/BddService.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export let cache = []

export async function startCache  () { 

    cache = await getAll()
    console.log("le cache à bien été lancer ");
}


