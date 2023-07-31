import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityView } from 'lemmy-js-client';

@Component({
  selector: 'app-recent-communities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-communities.component.html',
  styleUrls: ['./recent-communities.component.scss'],
})
export class RecentCommunitiesComponent {
  @Input() public communities: CommunityView[] = [];

  @Output() public selectCommunity: EventEmitter<CommunityView> =
    new EventEmitter();
  @Output() public removeCommunity: EventEmitter<CommunityView> =
    new EventEmitter();

  public safeCommunities: CommunityView[] = [];
  public nsfwCommunities: CommunityView[] = [];

  public ngOnChanges() {
    this.safeCommunities = this.communities.filter(
      (community) => !community.community.nsfw
    );
    this.nsfwCommunities = this.communities.filter(
      (community) => community.community.nsfw
    );
  }
}
