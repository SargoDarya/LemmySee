import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';
import { PostFilter } from '../types';

export const appStateSelector = createFeatureSelector<AppState>('app');
export const communitySearchResultSelector = createSelector(
  appStateSelector,
  (appState) => appState.communitySearchResult
);
export const selectedCommunitySelector = createSelector(
  appStateSelector,
  (appState) => appState.selectedCommunity
);
export const currentPostIndexSelector = createSelector(
  appStateSelector,
  (appState) => appState.currentPostIndex
);

export const currentPageIndexSelector = createSelector(
  appStateSelector,
  (appState) => appState.currentPageIndex
);

export const loadedPostsSelector = createSelector(
  appStateSelector,
  (appState) => appState.loadedPosts
);

export const postFilterSelector = createSelector(
  appStateSelector,
  (appState) => appState.postFilter
);

export const sortTypeSelector = createSelector(
  appStateSelector,
  (appState) => appState.sortType
);

export const userVisitedCommunitiesSelector = createSelector(
  appStateSelector,
  (appState) => appState.userVisitedCommunites
);

export const savedPostsSelector = createSelector(
  appStateSelector,
  (appState) => appState.savedPosts
);

export const blockedActorsSelector = createSelector(
  appStateSelector,
  (appState) => appState.blockedActors
);

export const communitiesFromSavedPostsSelector = createSelector(
  savedPostsSelector,
  (posts) => {
    return Array.from(new Set(posts.map((post) => post.community.name)));
  }
);

export const filteredPostsSelector = createSelector(
  loadedPostsSelector,
  postFilterSelector,
  blockedActorsSelector,
  (posts, filter, blockedActors) => {
    switch (filter) {
      case PostFilter.MediaOnly:
        return posts.filter(
          (post) =>
            !!post.post.url && !blockedActors.includes(post.creator.actor_id)
        );

      case PostFilter.TextOnly:
        return posts.filter(
          (post) =>
            !post.post.url && !blockedActors.includes(post.creator.actor_id)
        );

      case PostFilter.All:
        return posts.filter(
          (post) => !blockedActors.includes(post.creator.actor_id)
        );
    }
  }
);

export const currentPostSelector = createSelector(
  filteredPostsSelector,
  currentPostIndexSelector,
  (posts, index) => posts[index]
);

export const needsMorePostsSelector = createSelector(
  selectedCommunitySelector,
  filteredPostsSelector,
  currentPostIndexSelector,
  (community, posts, index) => {
    return !!community && (posts.length === 0 || posts.length - 1 === index);
  }
);
