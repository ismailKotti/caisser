import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../../services/commande';
import { MontantService } from '../../services/montant';
import { ArticleService, Article } from '../../services/article.service';

interface ArticlePanier{
id:number;
nom:string;
image:string;
quantite:number;
totalPrix:number;
}

@Component({
selector:'app-caisse',
standalone:true,
imports:[CommonModule],
templateUrl:'./caisse.html',
styleUrl:'./caisse.css'
})
export class CaisseComponent{

constructor(
private commandeService: CommandeService,
private montantService: MontantService,
private articleService: ArticleService
){}

ngOnInit(){

this.articleService.getArticles()
.subscribe({

next:(data)=>{

console.log("Articles API :", data);

this.articles=data;

},

error:(err)=>{

console.log("Erreur API articles :",err);

}

});

}

categories=[
'Cold Drink',
'Hot Drink',
'Food'
];

categorieActive='Cold Drink';

articles:Article[]=[];

panier:Article[]=[];

message='';

timer:any;

changerCategorie(cat:string){
this.categorieActive=cat;
}

get articlesFiltres(){
return this.articles.filter(
a=>a.categorie===this.categorieActive
);
}

ajouterArticle(article:Article){
this.panier.push(article);
}

get total(){
return this.panier.reduce(
(s,a)=>s+a.prix,
0
);
}

validerCommande(){

if(this.panier.length===0){
return;
}

const commande={
articles:this.panierGroupe,
montant:this.total,
temps:new Date()
};

this.commandeService.ajouterCommande(commande)
.subscribe({
next:()=>{
this.montantService.ajouterMontant(this.total);
this.panier=[];
this.message='Votre commande est validée avec succès';

clearTimeout(this.timer);

this.timer=setTimeout(()=>{
this.message='';
},3000);

},
error:(err)=>{
console.log("Erreur API commande :",err);
}
});

}

viderPanier(){
this.panier=[];
}

get panierGroupe():ArticlePanier[]{
const groupes:{[key:number]:ArticlePanier}={};

this.panier.forEach(article=>{

if(!groupes[article.id]){
groupes[article.id]={
id:article.id,
nom:article.nom,
image:article.image,
quantite:0,
totalPrix:0
};
}

groupes[article.id].quantite++;
groupes[article.id].totalPrix+=article.prix;

});

return Object.values(groupes);
}

augmenterArticle(id:number){

const article=this.articles.find(
a=>a.id===id
);

if(article){
this.panier.push(article);
}

}

diminuerArticle(id:number){

const index=this.panier.findIndex(
a=>a.id===id
);

if(index!==-1){
this.panier.splice(index,1);
}

}

supprimerLigne(id:number){

this.panier=this.panier.filter(
a=>a.id!==id
);

}

}