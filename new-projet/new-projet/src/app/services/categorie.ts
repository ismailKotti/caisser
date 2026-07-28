import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  categories: string[] = [
    'Cold Drinks',
    'Hot Drinks',
    'Food'
  ];

  getCategories() {
    return this.categories;
  }

  ajouterCategorie(categorie: string) {

    if (
      categorie.trim() !== '' &&
      !this.categories.includes(categorie)
    ) {

      this.categories.push(categorie);

    }

  }

  supprimerCategorie(categorie: string) {

    this.categories =
      this.categories.filter(c => c !== categorie);

  }

}