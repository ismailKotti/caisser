import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Article {
id: number;
nom: string;
prix: number;
image: string;
categorie: string;
}
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private http = inject(HttpClient);

  private API_URL = 'http://localhost:3001/api/produits';


  getArticles(): Observable<Article[]> {

    return this.http.get<Article[]>(this.API_URL);

  }


  ajouterArticle(article: Article): Observable<Article> {

    return this.http.post<Article>(
      this.API_URL,
      article
    );

  }


  supprimerArticle(id: number): Observable<any> {

    return this.http.delete(
      `${this.API_URL}/${id}`
    );

  }


  modifierArticle(article: Article): Observable<Article> {

    return this.http.put<Article>(
      `${this.API_URL}/${article.id}`,
      article
    );

  }

}