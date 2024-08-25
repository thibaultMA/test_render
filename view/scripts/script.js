const pagnier = []
const  SVG_POUBELLE = "<img class='button_poubelle' src=\"img/utils/poubelle.svg\">"

export const commande = []

window.ttt = function (prod) {
    let id = prod.getAttribute("cible");
    let div = prod.parentNode
    let num = div.querySelector('.num')
    ajoutePagnier(id,num)
}

// window.ajouterProduit = function (prod) {
//     let produit = pagnier.find(e=>e.id==prod.getAttribute("cible"))
//     produit.ajout()
//     if (produit.num.innerText == "2") {
//         document.querySelector('#moin-'+produit.id+" > svg").classList.toggle("d-none")
//         document.querySelector('#moin-'+produit.id+" > p").classList.toggle("d-none")
//     }
// }

window.enleverProduit = function (prod) {
    let id = prod.getAttribute("cible");
    let produit = pagnier.find(e=>e.id == id)
    if (!produit) return
        produit.enleve()
    if (produit.quantite <= 0) {
        pagnier.splice(pagnier.findIndex(a => a === produit) , 1)
        document.querySelector('#quantite_menu_'+produit.id).classList.toggle("d-none")
    }
    if (produit.quantite == 1) {
        document.querySelector('#moin-'+produit.id+" > svg").classList.remove("d-none")
        document.querySelector('#moin-'+produit.id+" > p").classList.add("d-none")
    }
    if (pagnier.length == 0) {
        togglebutton(false)

    }
}

function ajoutePagnier(id,num){
    let produit = pagnier.find(el=>el.id == id)
    if(produit == undefined) {
        produit = new produitDTO(id,num)
        pagnier.push(produit)
    }
    produit.ajout()

    if (produit.quantite == 1) {
        document.querySelector('#quantite_menu_'+id).classList.toggle("d-none")
    
    }
    if (produit.quantite == 2) {
        document.querySelector('#moin-'+produit.id+" > svg").classList.add("d-none")
        document.querySelector('#moin-'+produit.id+" > p").classList.remove("d-none")
    }
    range_pagnier()
}

// function enlevePagnier(id) {
  
//     let div = document.querySelector("#quantite_menu_"+id)
//     // div.setAttribute('hidden',"")
//     div.querySelector('.num').innerText = " "
//     div.querySelector('#moin-'+id).setAttribute('hidden',"")
//     pagnier.splice(pagnier.findIndex(e=> e.id == id ),1);
//     range_pagnier()
// }

function range_pagnier() {
    pagnier.sort((a,b)=>Number.parseInt(a.id)-Number.parseInt(b.id)) 
    pagnier.forEach(a=> console.log(a))
    pagnier.length > 0 ? togglebutton(true): null
    // if (pagnier.length > 0) {
    //     togglebutton(true)
    // }else{
    //     togglebutton(false)
    // }
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
        document.querySelector('#menu-button').classList.remove('d-none')
    })
    .catch(err=>{
        console.log(err)
        document.querySelector('#menu-button').classList.add('d-none')
    })
}

function togglebutton(onoff) { 
    const buttonCommande = document.querySelector('#affiche-command-button');
    if (onoff) {
            
        buttonCommande.removeAttribute("disabled")
    } else {
        buttonCommande.setAttribute("disabled",onoff)
    }
}

function retourCommande(data) {
    let d = document.querySelector("#affiche-command");
    d.innerHTML=""
    data.produitBody.forEach(el => {
        let box = document.createElement('div');
        let nom = document.createElement('p');
        let quantite = document.createElement('span');
        let prix = document.createElement('prix');
        
        nom.innerText = el.valeur.nom;
        quantite.innerText = " x"+el.quantite;
        prix.innerText = el.valeur.prix + " €";

        quantite.classList.add("commande-quantite")
        nom.classList.add("commande-nom")
        prix.classList.add("commande-prix")

        nom.appendChild(quantite);
        
        box.appendChild(nom);
        box.appendChild(prix);
        d.appendChild(box);

        commande.push(formatCommande(el))
    });
    console.log(commande);
    let total = document.createElement('h1')
    total.innerText = "Total : "+data.total+" €"
    d.appendChild(total)
}

function formatCommande(data) {
    
    return{ id: data.valeur.id, quantite: data.quantite }
}

class produitDTO{
    constructor(id,num){
        this.id = id
        this.quantite =0
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
        this.num.innerText = this.quantite
        return true
    }

}

window.toggleMenu = function () {
    document.getElementById("side-menu").classList.toggle('d-none');
    document.getElementById("bg-dark").classList.toggle('d-none');
}

window.payement =function () {
    location.assign('/payement?commande='+JSON.stringify(pagnier))
}

//TODO suprimer après teste
// document.querySelectorAll(".boutton-plus.plus.choix-quantite").forEach(e=>e.click())