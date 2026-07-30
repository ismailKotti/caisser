import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3001/api/auth/login';

  private currentUserSubject = new BehaviorSubject<any>(this.loadUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private loadUserFromStorage() {
    try {
      const data = localStorage.getItem('user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private readonly EMAIL_VALIDE = 'admin@test.com';
  private readonly MDP_VALIDE = '123456';
  private readonly REMEMBER_KEY = 'rememberedCredentials';

  login(email: string, motDePasse: string, nom?: string): Observable<any> {
    const cleanEmail = (email || '').trim();
    const cleanPass = (motDePasse || '').trim();
    const cleanNom = (nom || '').trim().toLowerCase();

    return this.http.post<any>(this.API_URL, { email: cleanEmail, pass: cleanPass }).pipe(
      tap((response) => {
        if (response && response.access_token) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', response.access_token);
          const userToSave = { ...(response.user || {}), nom: cleanNom };
          localStorage.setItem('user', JSON.stringify(userToSave));
          this.currentUserSubject.next(userToSave);
        }
      }),
      catchError((error) => {
        // Fallback en cas d'Ǹchec API si le mot de passe est valide ('123456') et que l'utilisateur est admin (email ou nom 'admin')
        const isAdminEmail = cleanEmail.toLowerCase() === this.EMAIL_VALIDE.toLowerCase() || cleanEmail.toLowerCase() === 'admin';
        if ((isAdminEmail || cleanNom === 'admin') && cleanPass === this.MDP_VALIDE) {
          const defaultUser = { email: cleanEmail || this.EMAIL_VALIDE, role: 'admin', nom: 'admin' };
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(defaultUser));
          this.currentUserSubject.next(defaultUser);
          return of({ user: defaultUser });
        }
        console.error('Erreur de connexion:', error?.error?.message || error?.message);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
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