import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


export interface Commande {
  id?: any;
  articles: any[];
  montant: number;
  temps: Date | string;
  [key: string]: any;
}


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private http = inject(HttpClient);

  private API_URL = 'http://localhost:3001/api/orders';


  ajouterCommande(commande: Commande): Observable<any> {
    let id_user = '00000000-0000-0000-0000-000000000000';
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        id_user = user.id || user.id_user || user.sub || id_user;
      } catch (e) {}
    }

    // Transformation au format du DTO NestJS (CreateOrderDto)
    const payload = {
      id_user: id_user,
      prix_total: Number(commande.montant || 0),
      order_item: (commande.articles || []).map((item: any) => ({
        id_pro: String(item.id_pro || item.id),
        quantit: Number(item.quantite || item.quantit || 1)
      }))
    };

    return this.http.post<any>(
      this.API_URL,
      payload
    );
  }


  getCommandes(): Observable<Commande[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      map(data => data.map(cmd => ({
        ...cmd,
        id: cmd.id_order || cmd.id || cmd.incrementalId,
        montant: cmd.prix_total ?? cmd.montant ?? 0,
        temps: cmd.createdAt ? new Date(cmd.createdAt) : (cmd.temps ? new Date(cmd.temps) : new Date()),
        articles: (cmd.order_item || cmd.articles || []).map((item: any) => ({
          ...item,
          nom: item.produit?.name_pro || item.nom || 'Article inconnu',
          quantite: item.quantit ?? item.quantite ?? 1,
          image: item.produit?.img || item.image || '',
          totalPrix: (item.quantit ?? item.quantite ?? 1) * (item.produit?.prix_p ?? 0)
        }))
      })))
    );
  }

}