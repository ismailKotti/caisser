import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MontantService {

  private montantTotal = 0;

  ajouterMontant(montant: number) {
    this.montantTotal += montant;
  }

  diminuerMontant(montant: number) {
    this.montantTotal -= montant;
  }

  setMontantTotal(montant: number) {
    this.montantTotal = montant;
  }

  getMontantTotal(): number {
    return this.montantTotal;
  }

}