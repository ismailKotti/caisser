import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MontantService } from '../../services/montant';
import { AuthService } from '../../services/auth';

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
export class NavbarComponent implements OnInit {

  showArchiveMenu = false;
  montantActuel = 0;

  constructor(
    private router: Router,
    public montantService: MontantService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.montantService.montantTotal$.subscribe(val => {
      this.montantActuel = val;
      this.cdr.detectChanges();
    });
  }

  goCaisse() {
    this.router.navigate(['/caisse']);
  }

  goArchive() {
    this.router.navigate(['/archive']);
  }

  toggleArchiveMenu() {
    this.showArchiveMenu = !this.showArchiveMenu;
  }

  deconnecter() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}