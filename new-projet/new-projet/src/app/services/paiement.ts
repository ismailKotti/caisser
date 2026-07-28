import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Paiement {
  id?: number | string;
  raison: string;
  montant: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3001/api/payments';

  ajouterPaiement(paiement: Paiement): Observable<any> {
    const payload = {
      action: paiement.raison,
      prix_f: paiement.montant,
      raison: paiement.raison,
      montant: paiement.montant,
      date: paiement.date
    };
    return this.http.post<any>(this.API_URL, payload);
  }

  getPaiements(): Observable<Paiement[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      map(items => items.map(item => ({
        id: item.id_pay || item.id,
        raison: item.action || item.raison || 'Sans raison',
        montant: item.prix_f !== undefined ? item.prix_f : (item.montant || 0),
        date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR') : (item.date || '')
      })))
    );
  }
}