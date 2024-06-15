export class Produit{
    constructor(object){
        this.id = object.id
        this.nom = object.nom
        this.prix = object.prix
        this.img = object.img
    }
    
    affiche(){
        console.log("=> "+ this.toString());
    }
    toString(){
        return `Produit { id: '${this.id}', toto: '${this.nom}', prix: '${this.prix}' }`
    }
}