import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieService, Categorie } from '../../services/categorie';

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
  categories: Categorie[] = [];

  constructor(
    private categorieService: CategorieService
  ) {}

  ngOnInit() {
    this.chargerCategories();
  }

  chargerCategories() {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error("Erreur chargement catégories:", err)
    });
  }

  ajouterCategorie() {
    if (this.nouvelleCategorie.trim()) {
      this.categorieService.ajouterCategorie(this.nouvelleCategorie).subscribe({
        next: () => {
          this.nouvelleCategorie = '';
          this.chargerCategories();
        },
        error: (err) => console.error("Erreur ajout catégorie:", err)
      });
    }
  }

  supprimerCategorie(id_cat?: string) {
    if (!id_cat) return;
    this.categorieService.supprimerCategorie(id_cat).subscribe({
      next: () => {
        this.chargerCategories();
      },
      error: (err) => {
        // If it's a 404, it means it's already deleted (e.g. from a double-click)
        if (err.status === 404) {
          this.chargerCategories();
        } else {
          console.error("Erreur suppression catégorie:", err);
        }
      }
    });
  }

}