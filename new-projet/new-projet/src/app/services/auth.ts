import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly EMAIL_VALIDE = 'admin@test.com';
  private readonly MDP_VALIDE = '123456';
  private readonly REMEMBER_KEY = 'rememberedCredentials';

  login(email: string, motDePasse: string): boolean {
    if (email === this.EMAIL_VALIDE && motDePasse === this.MDP_VALIDE) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  motDePasseOublie(email: string): boolean {
    console.log('Email de reinitialisation envoye a :', email);
    return true;
  }

  sauvegarderIdentifiants(email: string, motDePasse: string): void {
    localStorage.setItem(this.REMEMBER_KEY, JSON.stringify({ email, motDePasse }));
  }

  effacerIdentifiants(): void {
    localStorage.removeItem(this.REMEMBER_KEY);
  }

  getIdentifiantsSauvegardes(): { email: string, motDePasse: string } | null {
    const data = localStorage.getItem(this.REMEMBER_KEY);
    return data ? JSON.parse(data) : null;
  }
fondCaisse = 0;

setFondCaisse(montant: number) {
  this.fondCaisse = montant;
}

getFondCaisse(): number {
  return this.fondCaisse;
}
}