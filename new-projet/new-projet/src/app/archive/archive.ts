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
    'Cold Drink',
    'Hot Drink',
    'Food'
  ];
  articles = [

    {
      nom: 'Coca Cola',
      categorie: 'Cold Drink'
    },

    {
      nom: 'Eau',
      categorie: 'Cold Drink'
    },

    {
      nom: 'Café',
      categorie: 'Hot Drink'
    },

    {
      nom: 'Thé',
      categorie: 'Hot Drink'
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


    return this.articles.filter(article =>

      article.categorie === this.categorieActive

    );


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