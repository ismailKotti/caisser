import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandeService, Commande } from '../services/commande';


@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './archive.html',
  styleUrl: './archive.css'
})
export class ArchiveComponent implements OnInit {
  commandes: Commande[] = [];
  recherche: string = '';
  afficherChoix = false;
  categorieActive = '';
  articleSelectionne = '';
  categories = [
    'Cold Drinks',
    'Hot Drinks',
    'Food'
  ];
  articles = [

    {
      nom: 'Coca Cola',
      categorie: 'Cold Drinks'
    },

    {
      nom: 'Eau',
      categorie: 'Cold Drinks'
    },

    {
      nom: 'Café',
      categorie: 'Hot Drinks'
    },

    {
      nom: 'Thé',
      categorie: 'Hot Drinks'
    },

    {
      nom: 'Pizza',
      categorie: 'Food'
    },

    {
      nom: 'Burger',
      categorie: 'Food'
    }

  ];
  constructor(
    private commandeService: CommandeService
  ) {}
  ngOnInit() {

  this.commandeService.getCommandes()
  .subscribe({

   next:(data)=>{

  console.log("Commandes reçues :", data);

  this.commandes = data;

},

    error:(err)=>{

      console.log("Erreur API commandes :",err);

    }

  });

}
  ouvrirChoix() {

    this.afficherChoix = !this.afficherChoix;

  }
  changerCategorie(cat: string) {

    this.categorieActive = cat;

  }
  get articlesFiltres() {
    return this.articles.filter(article => {
      if (!article || !article.categorie) return false;
      const catArt = String(article.categorie).trim().toLowerCase().replace(/s$/, '');
      const catAct = String(this.categorieActive).trim().toLowerCase().replace(/s$/, '');
      return catArt === catAct;
    });
  }
  choisirArticle(article: any) {


    this.articleSelectionne = article.nom;


    this.afficherChoix = false;


  }
  get commandesFiltrees(){
let result=this.commandes;

if(this.recherche){
result=result.filter(cmd=>
JSON.stringify(cmd.articles)
.toLowerCase()
.includes(this.recherche.toLowerCase())
);
}

if(this.articleSelectionne){
result=result.filter(cmd=>
cmd.articles.some((a:any)=>
a.nom===this.articleSelectionne
)
);
}

return result;
}
  imprimer(commande: Commande) {
    console.log('Commande : ', commande);


    window.print();


  }
}