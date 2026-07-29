import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService, Article } from '../../services/article.service';
import { CategorieService, Categorie } from '../../services/categorie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './ajouter.html',
  styleUrl: './ajouter.css'
})
export class AjouterComponent {

article: Article = {
id:0,
nom:'',
prix:0,
image:'',
categorie:''
};
  categories: Categorie[] = [];

  messageErreur = '';
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private categorieService: CategorieService
  ){}
  ngOnInit(){

    this.categorieService.getCategories().subscribe(data => {
      this.categories = data;
    });

  }
  retour() {
    this.router.navigate(['/listing']);
  }
  ajouter() {
if(
  this.article.nom.trim() === '' ||
  this.article.image.trim() === '' ||
  this.article.categorie.trim() === '' ||
  this.article.prix === 0
){

  this.messageErreur = "Tous les champs sont obligatoires";
  return;

}
if(!Number.isInteger(this.article.prix)){

  this.messageErreur = "Le prix doit être un nombre entier";
  return;

}
this.articleService.ajouterArticle(this.article)
.subscribe(() => {

  this.router.navigate(['/listing']);

});


}
}