import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortType } from 'lemmy-js-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-type-selector',
  templateUrl: './sort-type-selector.component.html',
  styleUrls: ['./sort-type-selector.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class SortTypeSelectorComponent {
  @Input() public sortType: SortType = 'Hot';

  @Output() public selectSortType: EventEmitter<SortType> = new EventEmitter();

  public readonly sortTypeOptions: SortType[] = [
    'Active',
    'Hot',
    'Controversial',
    'MostComments',
    'New',
    'NewComments',
    'Old',
    'TopAll',
    'TopMonth',
    'TopWeek',
    'TopDay',
  ];

  public readonly sortTypeControl = new FormControl<SortType>('Hot');

  public ngOnInit() {
    this.sortTypeControl.setValue(this.sortType);
  }
}
