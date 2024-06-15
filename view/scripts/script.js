const pagnier = []
const SVG_POUBELLE  = `<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill-rule="nonzero"/></svg>`
function ttt(el) {
    let id = el.getAttribute("cible");
    let div = el.parentNode
    let num = div.querySelector('.num')
    el.setAttribute('checked',"")
    if(num.textContent == " "){
        ajoutePagnier(id,num)
        div.querySelector('.selection').removeAttribute('hidden')
        el.setAttribute('hidden',"")
    }
    else {
        enlevePagnier(id,num)
    }

}

function ajouterProduit(prod) {
    let produit = pagnier.find(e=>e.id==prod.getAttribute("cible"))
    produit.ajout()
}
function enleverProduit(prod) {
    let produit = pagnier.find(e=>e.id == prod.getAttribute("cible"))
    produit.enleve()
    console.log(produit.num);
    if (produit.num.textContent == 1) {
        console.log("moin == poubelle");
        document.querySelector('#moin-'+produit.id).innerHTML = SVG_POUBELLE
    }
}

function ajoutePagnier(id,num){
    pagnier.push(new produitDTO(id,num))
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

function submitCommande(){

    let body = JSON.stringify(pagnier.map(e=>e.export()))
    fetch('/api/command',{
        method:"POST",
        body,
    })
    .then(res=>res.json())
    .then(data => {
        // Redirection côté client vers /secondPage
        console.log(data);
        let d = document.querySelector("#affiche-command");
        d.innerHTML=""
        data.produitBody.forEach(el=>{
            
            let box = document.createElement('div')
            let nom = document.createElement('p')
            let quantite = document.createElement('p')
            let prix = document.createElement('prix')

            nom.innerText=el.nom
            quantite.innerText=el.quantite
            prix.innerText=el.prix

            box.appendChild(nom)
            box.appendChild(quantite)
            box.appendChild(prix)
            d.appendChild(box)
            })
            let total = document.createElement('h1')
            total.innerText = data.total
            d.appendChild(total)

        // window.location.href = data.url;
    })
    .catch(err=>console.log(err))
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