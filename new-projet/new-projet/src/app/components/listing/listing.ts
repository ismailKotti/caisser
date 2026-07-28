import {ChangeDetectorRef, Component, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  Article,
  ArticleService,
} from '../../services/article.service';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './listing.html',
  styleUrl: './listing.css',
})
export class ListingComponent implements OnInit {

  articles: Article[] = [];

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.chargerArticles();
  }

  allerCategorie(): void {
    this.router.navigate(['/categorie']);
  }

  allerAjouter(): void {
    this.router.navigate(['/ajouter']);
  }

  chargerArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (data: Article[]) => {
        console.log('Articles reçus listing :', data);

        this.articles = [...data];

        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        console.error('Erreur API articles :', err);
      },
    });
  }

  supprimer(id?: number | string): void {
    if (!id) return;
    this.articleService.supprimerArticle(id).subscribe({
      next: () => {
        this.chargerArticles();
      },
      error: (err) => {
        console.error('Erreur suppression :', err);
      },
    });
  }
}