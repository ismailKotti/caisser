import { Component, ChangeDetectorRef } from '@angular/core';
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
    private commandeService:CommandeService,
    private montantService:MontantService,
    private articleService:ArticleService,
    private cdr:ChangeDetectorRef
  ){}

  categories:string[]=['Tous'];

  categorieActive='Tous';

  articles:Article[]=[];

  panier:Article[]=[];

  message='';

  timer:any;

  ngOnInit(){

    this.articleService.getArticles().subscribe({

      next:(data)=>{

        console.log(data);

        this.articles=data;
console.table(this.articles);
        const uniqueCats=Array.from(
          new Set(
            data.map(article=>{

              if(typeof article.categorie==='object' && article.categorie?.type_cat){
                return article.categorie.type_cat;
              }

              if(typeof article.categorie==='string'){
                return article.categorie;
              }

              return '';

            }).filter(c=>c!='')
          )
        );

        this.categories=[
          'Tous',
          ...uniqueCats as string[]
        ];

        this.categorieActive='Tous';

        this.cdr.detectChanges();

      },

      error:(err)=>{
        console.log(err);
      }

    });

  }

  changerCategorie(cat:string){
    this.categorieActive=cat;
  }

  get articlesFiltres():Article[]{

    if(this.categorieActive==='Tous'){
      return this.articles;
    }

    return this.articles.filter(article=>{

      let categorie='';

      if(typeof article.categorie==='object' && article.categorie?.type_cat){
        categorie=article.categorie.type_cat;
      }

      else if(typeof article.categorie==='string'){
        categorie=article.categorie;
      }

      return categorie.trim().toLowerCase()===this.categorieActive.trim().toLowerCase();

    });

  }

  ajouterArticle(article:Article){
    this.panier.push(article);
  }

  get total(){
    return this.panier.reduce((s,a)=>s+a.prix,0);
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

    this.commandeService.ajouterCommande(commande).subscribe({

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
        console.log(err);
      }

    });

  }

  viderPanier(){
    this.panier=[];
  }

  get panierGroupe():ArticlePanier[]{

    const groupes:{[key:string]:ArticlePanier}={};

    this.panier.forEach(article=>{

      const key=String((article as any).id_pro || article.id);

      if(!groupes[key]){

        groupes[key]={

          id:article.id,
          id_pro:(article as any).id_pro || article.id,
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

    const article=this.articles.find(a=>a.id===id);

    if(article){
      this.panier.push(article);
    }

  }

  diminuerArticle(id:number){

    const index=this.panier.findIndex(a=>a.id===id);

    if(index!=-1){
      this.panier.splice(index,1);
    }

  }

  supprimerLigne(id:number){

    this.panier=this.panier.filter(a=>a.id!==id);

  }

}