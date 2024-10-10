import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
    /* Angular <=16 */
    // @Input() search = '';
    // @Output() searchChange = new EventEmitter<string>();
    // @Output('submit') searchButtonClicked = new EventEmitter();

    /* Angular 17 */
    // search = input<string>('');
    // searchChange = output<string>();
    searchButtonClicked = output({ alias: 'submit' });

    /* 17.2 */
    search = model<string>(''); // model creates an input property and an output event emitter at the same time

    searchClick() {
        this.searchButtonClicked.emit();
    }

    /* no need if we use two way binding [(ngModel)]="search" */
    // updateSearch(value: string) {
    //     // this.searchChange.emit(value);
    //     /* 17.2 */
    //     // equivalent of emit()
    //     this.search.set(value);
    // }
}
