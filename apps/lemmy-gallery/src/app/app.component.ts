import {Component} from '@angular/core';
import {LemmyService} from './services/lemmy.service';
import {filter, Observable} from 'rxjs';
import {CommunityView, PostView, SortType} from 'lemmy-js-client';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SearchComponent} from './search.component';
import {SortTypeSelectorComponent} from './sort-type-selector/sort-type-selector.component';
import {Store} from '@ngrx/store';
import {AppActions} from './+state/app.actions';
import {SearchResultViewComponent} from './search-result-view/search-result-view.component';
import {
  communitiesFromSavedPostsSelector,
  communitySearchResultSelector,
  currentPostIndexSelector,
  currentPostSelector,
  savedPostsSelector,
  selectedCommunitySelector,
  userVisitedCommunitiesSelector,
} from './+state/app.selectors';
import {PostTypeSelectorComponent} from './post-type-selector/post-type-selector.component';
import {PostFilter} from './types';
import {PostViewComponent} from './post-view/post-view.component';
import {PostNavigatorComponent} from './post-navigator/post-navigator.component';
import {SavedPostsComponent} from './saved-posts/saved-posts.component';
import {RecentCommunitiesComponent} from './recent-communities/recent-communities.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    SearchComponent,
    SortTypeSelectorComponent,
    SearchResultViewComponent,
    NgOptimizedImage,
    PostTypeSelectorComponent,
    PostViewComponent,
    PostNavigatorComponent,
    SavedPostsComponent,
    RecentCommunitiesComponent,
  ]
})
export class AppComponent {
  // Store stuff
  public selectedCommunity$: Observable<CommunityView> = this.store
      .select(selectedCommunitySelector)
      .pipe(filter((community) => !!community)) as Observable<CommunityView>;
  public communitySearchResults$ = this.store.select(
      communitySearchResultSelector
  );
  public visiblePost$ = this.store.select(currentPostSelector);
  public postIndex$ = this.store.select(currentPostIndexSelector);
  public savedPosts$ = this.store.select(savedPostsSelector);
  public communitesFromSavedPosts$ = this.store.select(
      communitiesFromSavedPostsSelector
  );
  public recentCommunities$: Observable<CommunityView[]> = this.store.select(
      userVisitedCommunitiesSelector
  );

  public constructor(
      public readonly client: LemmyService,
      public readonly store: Store
  ) {
  }

  public navigate(direction: number) {
    this.store.dispatch(AppActions.navigate({direction}));
  }

  public selectCommunity(community: CommunityView) {
    this.store.dispatch(AppActions.selectCommunity({community}));
  }

  public updateSearchTerm(searchTerm: string) {
    this.store.dispatch(AppActions.search({searchTerm}));
  }

  public selectPostFilter(postFilter: PostFilter) {
    this.store.dispatch(AppActions.selectPostFilterType({postFilter}));
  }

  public selectSortType(sortType: SortType) {
    this.store.dispatch(AppActions.selectSortType({sortType}));
  }

  public savePost(post: PostView) {
    this.store.dispatch(AppActions.savePost({post}));
  }

  public showSavedPosts(posts: PostView[]) {
    this.store.dispatch(AppActions.showSavedPosts({posts}));
  }

  public blockActor(actor: string) {
    this.store.dispatch(AppActions.blockActor({actor}));
  }

  public login(loginForm: { username: string, password: string }) {
    this.store.dispatch(AppActions.userLogin(loginForm));
  }

  protected readonly userVisitedCommunitiesSelector =
      userVisitedCommunitiesSelector;
}
