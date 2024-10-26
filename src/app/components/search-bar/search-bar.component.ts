import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit, OnDestroy {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private routeSubscription: Subscription | null = null;
    query = '';
    searchButtonClicked = output<string>({ alias: 'submit' });

    ngOnInit(): void {
        this.routeSubscription = this.route.queryParams.subscribe((params) => {
            this.query = params['q'];
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription?.unsubscribe();
    }

    submitSearch() {
        if (location.pathname === '/') this.searchButtonClicked.emit(this.query);
        if (location.pathname === '/paginated')
            this.router.navigate([location.pathname], { queryParams: { q: this.query, page: 1 } });
    }
}
