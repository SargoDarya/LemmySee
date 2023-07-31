import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LemmyService } from './services/lemmy.service';
import { debounceTime, filter } from 'rxjs';
import { CommunityView } from 'lemmy-js-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class SearchComponent {
  public searchControl = new FormControl<string>('');

  @Output() public selectCommunity = new EventEmitter<CommunityView>();
  @Output() public searchTerm: EventEmitter<string> =
    new EventEmitter<string>();

  public constructor(private readonly client: LemmyService) {}

  public ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        filter((value) => !!value)
      )
      .subscribe((value: string | null) => {
        this.searchTerm.next(<string>value);
      });
  }
}
