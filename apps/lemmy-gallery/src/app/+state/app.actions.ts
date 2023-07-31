import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {CommunityView, GetPostsResponse, PostView, SearchResponse, SortType,} from 'lemmy-js-client';
import {PostFilter} from '../types';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Load Saved State': props<{
      blockedActors: string[],
      jwt: string,
      savedPosts: PostView[],
      recentCommunities: CommunityView[]
    }>(),
    Search: props<{ searchTerm: string }>(),
    'Search Success': props<SearchResponse>(),
    'Search Failed': emptyProps(),
    'Select Community': props<{ community: CommunityView }>(),
    'Load Posts Success': props<{ response: GetPostsResponse; page: number }>(),
    'Load Posts Failed': emptyProps(),
    Navigate: props<{ direction: number }>(),
    'Select Post Filter Type': props<{ postFilter: PostFilter }>(),
    'Select Sort Type': props<{ sortType: SortType }>(),
    'Save Post': props<{ post: PostView }>(),
    'Show Saved Posts': props<{ posts: PostView[] }>(),
    'Block Actor': props<{ actor: string }>(),
    'Unblock Actor': props<{ actor: string }>(),
    'User Login': props<{ username: string, password: string }>()
  },
});
