import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../services/categorie';
@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categorie.html',
  styleUrl: './categorie.css'
})
export class CategorieComponent {

  nouvelleCategorie = '';

  categories: string[] = [];

  constructor(
    private categorieService: CategorieService
  ) {}

  ngOnInit() {

    this.categories =
      this.categorieService.getCategories();

  }

  ajouterCategorie() {

    this.categorieService.ajouterCategorie(
      this.nouvelleCategorie
    );

    this.nouvelleCategorie = '';

    this.categories =
      this.categorieService.getCategories();

  }

  supprimerCategorie(categorie: string) {

    this.categorieService.supprimerCategorie(categorie);

    this.categories =
      this.categorieService.getCategories();

  }

}