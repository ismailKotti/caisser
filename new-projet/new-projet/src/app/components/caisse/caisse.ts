import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../../services/commande';
import { MontantService } from '../../services/montant';
import { ArticleService, Article } from '../../services/article.service';

interface ArticlePanier{
id:any;
id_pro?:any;
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

const uniqueCats = Array.from(new Set(data.map(a => {
  if (!a) return 'Sans catégorie';
  if (typeof a.categorie === 'object' && a.categorie?.type_cat) return String(a.categorie.type_cat).trim();
  if (typeof a.categorie === 'string' && a.categorie.trim() !== '') return a.categorie.trim();
  if (a.id_cat) return a.id_cat; // Fallback
  return 'Sans catégorie';
}).filter(c => c && c !== '')));

if (uniqueCats.length > 0) {
  this.categories = uniqueCats as string[];
  if (!this.categorieActive || !this.categories.includes(this.categorieActive)) {
    this.categorieActive = this.categories[0];
  }
} else {
  this.categories = ['Cold Drinks', 'Hot Drinks', 'Food'];
  this.categorieActive = 'Cold Drinks';
}

},

error:(err)=>{

console.log("Erreur API articles :",err);

}

});

}

categories: string[] = [];
categorieActive = '';

articles:Article[]=[];

panier:Article[]=[];

message='';

timer:any;

changerCategorie(cat:string){
this.categorieActive=cat;
}

get articlesFiltres(){
return this.articles.filter(a => {
  if (!a) return false;
  
  let catArt = '';
  if (typeof a.categorie === 'object' && a.categorie?.type_cat) {
    catArt = String(a.categorie.type_cat).trim().toLowerCase();
  } else if (typeof a.categorie === 'string') {
    catArt = a.categorie.trim().toLowerCase();
  }
  
  const catAct = String(this.categorieActive || '').trim().toLowerCase();
  
  return catArt === catAct || String(a.id_cat) === this.categorieActive;
});
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
const groupes:{[key:string]:ArticlePanier}={};

this.panier.forEach(article=>{
const key = String((article as any).id_pro || article.id || 'inconnu');
if(!groupes[key]){
groupes[key]={
id:article.id,
id_pro: (article as any).id_pro || article.id,
nom:article.nom,
image:article.image,
quantite:0,
totalPrix:0
};
}

groupes[key].quantite++;
groupes[key].totalPrix+=article.prix;

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