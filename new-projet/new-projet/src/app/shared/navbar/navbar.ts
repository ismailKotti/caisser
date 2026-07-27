import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MontantService } from '../../services/montant';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  showArchiveMenu = false;

  constructor(
    private router: Router,
    public montantService: MontantService
  ) {}

  goCaisse() {
    this.router.navigate(['/caisse']);
  }

  goArchive() {
    this.router.navigate(['/archive']);
  }

  toggleArchiveMenu() {
    this.showArchiveMenu = !this.showArchiveMenu;
  }

}