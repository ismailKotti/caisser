import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { RetourButtonComponent } from './shared/retour-button/retour-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    RetourButtonComponent,
    CommonModule
  ],
  templateUrl: './app.html'
})
export class AppComponent {

  showNavbar = true;
  showRetourButton = false;

  private readonly hideNavbarRoutes = ['/login', '/listing', '/ajouter', '/categorie'];
  private readonly showRetourButtonRoutes = ['/categorie', '/ajouter'];

  constructor(private router: Router) {

    this.updateVisibility(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateVisibility(event.url);
      }
    });

  }

  private updateVisibility(url: string): void {
    this.showNavbar = !this.hideNavbarRoutes.includes(url);
    this.showRetourButton = this.showRetourButtonRoutes.includes(url);
  }

}