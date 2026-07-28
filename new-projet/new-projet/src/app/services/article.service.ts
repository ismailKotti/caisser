import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


export interface Categorie {
  id_cat?: string;
  img?: string;
  type_cat?: string;
  [key: string]: any;
}

export interface Article {
  id: any;
  nom: any;
  prix: any;
  image: any;
  categorie: any;

  id_pro?: string;
  name_pro?: string;
  desc?: string;
  img?: string;
  prix_p?: number;
  id_cat?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private http = inject(HttpClient);

  private API_URL = 'http://localhost:3001/api/produits';


  getArticles(): Observable<Article[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      map(data => data.map(item => ({
        ...item,
        id: item.id_pro ?? item.id,
        nom: item.name_pro ?? item.nom ?? 'Article sans nom',
        prix: item.prix_p ?? item.prix ?? 0,
        image: item.img ?? item.image ?? '',
        categorie: (typeof item.categorie === 'object' && item.categorie?.type_cat) ? item.categorie.type_cat : (item.categorie ?? 'Sans catégorie')
      })))
    );
  }


  ajouterArticle(article: Article): Observable<Article> {
    const payload = {
      ...article,
      name_pro: article.name_pro || article.nom,
      desc: article.desc || 'Aucune description',
      img: article.img || article.image,
      prix_p: article.prix_p || article.prix,
      id_cat: article.id_cat || '11111111-0000-0000-0000-000000000001' // Valeur de fallback si id_cat non fournie
    };
    return this.http.post<Article>(
      this.API_URL,
      payload
    );
  }


  supprimerArticle(id: number | string): Observable<any> {
    return this.http.delete(
      `${this.API_URL}/${id}`
    );
  }


  modifierArticle(article: Article): Observable<Article> {
    const id = article.id_pro || article.id;
    const payload = {
      ...article,
      name_pro: article.name_pro || article.nom,
      img: article.img || article.image,
      prix_p: article.prix_p || article.prix
    };
    return this.http.put<Article>(
      `${this.API_URL}/${id}`,
      payload
    );
  }

}