import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommunityView } from 'lemmy-js-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-result-view',
  templateUrl: './search-result-view.component.html',
  styleUrls: ['./search-result-view.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SearchResultViewComponent {
  @Input() public searchResults: CommunityView[] = [];

  @Output() public selectCommunity = new EventEmitter<CommunityView>();
}
