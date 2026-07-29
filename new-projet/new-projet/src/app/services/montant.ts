import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MontantService {

  private montantTotalSource = new BehaviorSubject<number>(0);
  montantTotal$ = this.montantTotalSource.asObservable();

  ajouterMontant(montant: number) {
    this.montantTotalSource.next(this.montantTotalSource.value + montant);
  }

  diminuerMontant(montant: number) {
    this.montantTotalSource.next(this.montantTotalSource.value - montant);
  }

  setMontantTotal(montant: number) {
    this.montantTotalSource.next(montant);
  }

  getMontantTotal(): number {
    return this.montantTotalSource.value;
  }

}