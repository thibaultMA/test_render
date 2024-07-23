const pagnier = []
const  SVG_POUBELLE = "<img class='button_poubelle' src=\"img/utils/poubelle.svg\">"

export const commande = []
window.ttt = function (el) {
    let id = el.getAttribute("cible");
    let div = el.parentNode
    let num = div.querySelector('.num')
    
    el.setAttribute('checked',"")
    if(num.textContent == " "){
        ajoutePagnier(id,num)
        div.querySelector('.selection').removeAttribute('hidden')
        el.setAttribute('hidden',"")
    }
}

window.ajouterProduit = function (prod) {
    let produit = pagnier.find(e=>e.id==prod.getAttribute("cible"))
    produit.ajout()
    if (produit.num.innerText == "2") {
        document.querySelector('#moin-'+produit.id+" > svg").classList.toggle("d-none")
        document.querySelector('#moin-'+produit.id+" > p").classList.toggle("d-none")
    }
}
window.enleverProduit = function (prod) {
    console.log(prod);
    let produit = pagnier.find(e=>e.id == prod.getAttribute("cible"))
    produit.enleve()
    console.log(produit.num);
    if (produit.num.innerText < 2) {
        document.querySelector('#moin-'+produit.id+" > svg").classList.toggle("d-none")
        document.querySelector('#moin-'+produit.id+" > p").classList.toggle("d-none")

    }
}

function ajoutePagnier(id,num){
    let produit = new produitDTO(id,num)
    pagnier.push(produit)
    range_pagnier()
}

function enlevePagnier(id) {
  
    let div = document.querySelector("#quantite_menu_"+id)
    div.setAttribute('hidden',"")
    div.querySelector('.num').innerText = " "
    document.querySelector("#checked-"+id).removeAttribute('hidden')
    pagnier.splice(pagnier.findIndex(e=> e.id == id ),1);
    range_pagnier()
}

function range_pagnier() {
    pagnier.sort((a,b)=>Number.parseInt(a.id)-Number.parseInt(b.id)) 
    pagnier.forEach(a=> console.log(a))
    console.log('----------------------------------------');
}

window.submitCommande=function (){

    let body = JSON.stringify(pagnier.map(e=>e.export()))
    fetch('/api/command',{
        method:"POST",
        body,
    })
    .then(res=>res.json())
    .then(data => {
        commande.length =0
        retourCommande(data);
    })
    .catch(err=>{
        console.log(err)
        document.querySelector('#resultat_commande').setAttribute('hidden',"")
    })
}

function retourCommande(data) {
    let d = document.querySelector("#affiche-command");
    d.innerHTML=""
    data.produitBody.forEach(el => {
        let box = document.createElement('div');
        let nom = document.createElement('p');
        let quantite = document.createElement('p');
        let prix = document.createElement('prix');
        console.log(el.quantite);
        nom.innerText = el.valeur.nom;
        quantite.innerText = el.quantite;
        prix.innerText = el.valeur.prix;

        box.appendChild(nom);
        box.appendChild(quantite);
        box.appendChild(prix);
        d.appendChild(box);

        commande.push(formatCommande(el))
    });
    console.log(commande);
    let total = document.createElement('h1')
    total.innerText = data.total
    d.appendChild(total)
    document.querySelector('#resultat_commande').removeAttribute('hidden')
}

function formatCommande(data) {
    
    return{ id: data.valeur.id, quantite: data.quantite }
}

class produitDTO{
    constructor(id,num){
        this.id = id
        this.quantite = 1
        this.num = num
        this.majquantite()
    }
    export(){
        return {
            id:this.id,
            quantite : this.quantite
        }
    }
    ajout(){
        this.quantite++
        this.majquantite()
    }
    enleve(){
        this.quantite--
        
        this.majquantite()
    }
    majquantite(){
        if (this.quantite >0) {
            this.num.innerText = this.quantite
            return true
        } 
        else enlevePagnier(this.id)
    }

}