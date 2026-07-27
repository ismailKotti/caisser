import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Paiement {
  id?: number;
  raison: string;
  montant: number;
  date: string;
}


@Injectable({
  providedIn: 'root'
})
export class PaiementService {


private http = inject(HttpClient);

private API_URL = 'http://localhost:3000/paiements';



ajouterPaiement(paiement:Paiement):Observable<Paiement>{

return this.http.post<Paiement>(
this.API_URL,
paiement
);

}



getPaiements():Observable<Paiement[]>{

return this.http.get<Paiement[]>(
this.API_URL
);

}


}