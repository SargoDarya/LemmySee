import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostView } from 'lemmy-js-client';

@Component({
  selector: 'app-saved-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.scss'],
})
export class SavedPostsComponent {
  @Input() posts: PostView[] = [];

  @Output() showPosts: EventEmitter<PostView[]> = new EventEmitter();

  public postsByCommunity: Record<string, PostView[]> = {};
  public communities: string[] = [];

  public ngOnChanges() {
    this.postsByCommunity = this.posts.reduce((acc, post) => {
      return {
        ...acc,
        [post.community.name]: [...(acc[post.community.name] || []), post],
      };
    }, {} as Record<string, PostView[]>);
    this.communities = Object.keys(this.postsByCommunity);
  }
}
