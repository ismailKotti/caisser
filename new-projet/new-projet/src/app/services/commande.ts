import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Commande {

  id?: number;
  articles:any[];
  montant:number;
  temps:Date;

}


@Injectable({
providedIn:'root'
})
export class CommandeService {


private http = inject(HttpClient);


private API_URL = 'http://localhost:3000/commandes';



ajouterCommande(commande:Commande):Observable<Commande>{

  return this.http.post<Commande>(
    this.API_URL,
    commande
  );

}



getCommandes():Observable<Commande[]>{

  return this.http.get<Commande[]>(
    this.API_URL
  );

}


}