import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() emitedQuery: EventEmitter<string> = new EventEmitter<string>();

  searchData(event) {
    const query = event.target.value;
    this.emitedQuery.emit(query);
  }
}
