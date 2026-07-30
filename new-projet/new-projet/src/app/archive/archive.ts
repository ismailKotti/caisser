import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandeService, Commande } from '../services/commande';
import { CategorieService, Categorie } from '../services/categorie';
import { ArticleService, Article } from '../services/article.service';

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
  
  categories: Categorie[] = [];
  articles: Article[] = [];

  constructor(
    private commandeService: CommandeService,
    private categorieService: CategorieService,
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.categorieService.getCategories().subscribe(data => {
      this.categories = data;
      if (this.categories.length > 0) {
        this.categorieActive = this.categories[0].type_cat || '';
      }
      this.cdr.detectChanges();
    });

    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
      this.cdr.detectChanges();
    });

  this.commandeService.getCommandes()
  .subscribe({

   next:(data)=>{

  console.log("Commandes reçues :", data);

  this.commandes = data;
  this.cdr.detectChanges();

},

    error:(err)=>{

      console.log("Erreur API commandes :",err);

    }

  });

}
  ouvrirChoix() {

    this.afficherChoix = !this.afficherChoix;

  }
  changerCategorie(cat?: string) {
    this.categorieActive = cat || '';
  }
  get articlesFiltres() {
    return this.articles.filter(a => {
      if (!a || !a.categorie) return false;
      
      let catArt = '';
      if (typeof a.categorie === 'object' && a.categorie.type_cat) {
        catArt = a.categorie.type_cat.trim().toLowerCase();
      } else if (typeof a.categorie === 'string') {
        catArt = a.categorie.trim().toLowerCase();
      } else {
        catArt = String(a.id_cat || 'Sans catégorie').trim().toLowerCase();
      }
      
      const catAct = String(this.categorieActive || '').trim().toLowerCase();
      
      return catArt === catAct || String(a.id_cat) === this.categorieActive;
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