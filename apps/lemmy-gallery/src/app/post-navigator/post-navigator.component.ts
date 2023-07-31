import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTypeSelectorComponent } from '../post-type-selector/post-type-selector.component';
import { SortTypeSelectorComponent } from '../sort-type-selector/sort-type-selector.component';
import { SortType } from 'lemmy-js-client';
import { PostFilter } from '../types';

@Component({
  selector: 'app-post-navigator',
  standalone: true,
  imports: [CommonModule, PostTypeSelectorComponent, SortTypeSelectorComponent],
  templateUrl: './post-navigator.component.html',
  styleUrls: ['./post-navigator.component.scss'],
})
export class PostNavigatorComponent {
  @Input() postIndex: number | null = 0;

  @Output() navigate: EventEmitter<number> = new EventEmitter();
  @Output() selectSortType: EventEmitter<SortType> = new EventEmitter();
  @Output() selectPostFilter: EventEmitter<PostFilter> = new EventEmitter();
}
