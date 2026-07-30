import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categorie {
  id_cat?: string;
  img?: string;
  type_cat?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3001/api/categories';

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.API_URL);
  }

  ajouterCategorie(categorieName: string): Observable<Categorie> {
    const payload = {
      type_cat: categorieName,
      img: 'assets/default.png' // Default image for new categories
    };
    return this.http.post<Categorie>(this.API_URL, payload);
  }

  supprimerCategorie(id_cat: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id_cat}`);
  }
}