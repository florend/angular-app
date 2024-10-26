import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-paginator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
    @Input() totalItems: number = 0;
    @Input() itemsPerPage: number = 5;
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;
    @Input() query: string = '';
    pages: number[] = [1];

    private router = inject(Router);

    ngOnInit() {
        this.updatePages();
    }

    navigate() {
        this.router.navigate([location.pathname], {
            queryParams: { q: this.query, page: this.currentPage }
        });
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.navigate();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.navigate();
        }
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.navigate();
        }
    }

    private updatePages() {
        const pages = [1];
        if (this.currentPage === 1 && this.totalPages === 1) {
            this.pages = pages;
            return;
        }

        // 0 = ellipsis
        if (this.currentPage > 4) pages.push(0);

        const nbSidePage = 2;
        const leftPage = this.currentPage - nbSidePage;
        const rightPage = this.currentPage + nbSidePage;

        for (let i = leftPage > 2 ? leftPage : 2; i <= Math.min(this.totalPages, rightPage); i++) {
            pages.push(i);
        }

        // 0 = ellipsis
        if (rightPage + 1 < this.totalPages) pages.push(0);
        if (rightPage < this.totalPages) pages.push(this.totalPages);

        this.pages = pages;
    }
}
