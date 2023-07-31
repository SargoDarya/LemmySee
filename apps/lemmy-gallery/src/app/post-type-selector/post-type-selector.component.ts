import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostFilter } from '../types';

@Component({
  selector: 'app-post-type-selector',
  templateUrl: './post-type-selector.component.html',
  styleUrls: ['./post-type-selector.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class PostTypeSelectorComponent {
  @Input() public postFilter: PostFilter = PostFilter.MediaOnly;

  @Output() public selectPostFilter: EventEmitter<PostFilter> =
    new EventEmitter();

  public readonly postFilterOptions: PostFilter[] = [
    PostFilter.All,
    PostFilter.MediaOnly,
    PostFilter.TextOnly,
  ];

  public readonly postFilterControl = new FormControl<PostFilter>(
    this.postFilter
  );

  public ngOnInit() {
    this.postFilterControl.setValue(this.postFilter);
  }
}
