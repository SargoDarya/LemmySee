import {createFeature, createReducer, on} from '@ngrx/store';
import {CommunityView, PostView, SortType} from 'lemmy-js-client';
import {AppActions} from './app.actions';
import {PostFilter} from '../types';

export interface AppState {
  currentPostIndex: number;
  currentPageIndex: number;
  currentAlbumIndex: number;
  loadedPosts: PostView[];
  postFilter: PostFilter;
  sortType: SortType;
  userVisitedCommunites: CommunityView[];
  communitySearchResult: CommunityView[] | null;
  blockedActors: string[];
  selectedCommunity: CommunityView | null;
  savedPosts: PostView[];
}

const INITIAL_STATE: AppState = {
  currentPageIndex: -1,
  currentPostIndex: 0,
  currentAlbumIndex: 0,
  loadedPosts: [],
  sortType: 'Hot',
  postFilter: PostFilter.MediaOnly,
  userVisitedCommunites: [],
  communitySearchResult: null,
  blockedActors: [],
  selectedCommunity: null,
  savedPosts: [],
};

export const appFeature = createFeature({
  name: 'app',
  reducer: createReducer<AppState>(
    INITIAL_STATE,
    on(AppActions.loadSavedState, (state: AppState, {savedPosts, blockedActors, jwt, recentCommunities}) => {
      return {
        ...state,
        userVisitedCommunites: recentCommunities,
        blockedActors,
        savedPosts
      }
    }),
    on(AppActions.selectCommunity, (state: AppState, {community}) => {
      return {
        ...state,
        selectedCommunity: community,
        currentPostIndex: 0,
        currentPageIndex: 0,
        communitySearchResult: null,
        loadedPosts: [],
      };
    }),
    on(AppActions.selectCommunity, (state: AppState, {community}) => {
      if (
        state.userVisitedCommunites.some(
          (visitedCommunity) =>
            visitedCommunity.community.actor_id === community.community.actor_id
        )
      ) {
        return state;
      }

      return {
        ...state,
        userVisitedCommunites: [...state.userVisitedCommunites, community].sort(
          (a, b) => a.community.title.localeCompare(b.community.title)
        ),
      };
    }),
    on(AppActions.searchSuccess, (state: AppState, searchResults) => {
      return {
        ...state,
        communitySearchResult: searchResults.communities,
      };
    }),
    on(AppActions.loadPostsSuccess, (state: AppState, {response, page}) => {
      return {
        ...state,
        loadedPosts: [...state.loadedPosts, ...response.posts],
        currentPageIndex: page,
      };
    }),
    on(AppActions.navigate, (state: AppState, {direction}) => {
      if (!state.loadedPosts || state.loadedPosts.length === 0) {
        return state;
      }

      const newIndex = Math.max(0, state.currentPostIndex + direction);

      // If no community is selected, and we're at the end we can't load more posts
      // This is the case for saved posts
      if (!state.selectedCommunity && newIndex === state.loadedPosts.length) {
        return state;
      }

      return {
        ...state,
        currentPostIndex: newIndex,
      };
    }),
    on(AppActions.selectPostFilterType, (state: AppState, {postFilter}) => {
      return {
        ...state,
        postFilter,
        loadedPosts: [],
        currentPostIndex: 0,
        currentPageIndex: 0,
      };
    }),
    on(AppActions.selectSortType, (state: AppState, {sortType}) => {
      return {
        ...state,
        sortType,
        loadedPosts: [],
        currentPostIndex: 0,
        currentPageIndex: 0,
      };
    }),
    on(AppActions.savePost, (state: AppState, {post}) => {
      return {
        ...state,
        savedPosts: [post, ...state.savedPosts],
      };
    }),
    on(AppActions.showSavedPosts, (state: AppState, {posts}) => {
      return {
        ...state,
        loadedPosts: posts,
        selectedCommunity: null,
        currentPageIndex: 0,
        currentPostIndex: 0,
      };
    }),
    on(AppActions.blockActor, (state: AppState, {actor}) => {
      // This should actually never happen, but might slip through
      // as coding error
      if (state.blockedActors.includes(actor)) {
        return state;
      }

      return {
        ...state,
        blockedActors: [...state.blockedActors, actor],
      };
    }),
    on(AppActions.unblockActor, (state: AppState, {actor}) => {
      return {
        ...state,
        blockedActors: state.blockedActors.filter(
          (blockedActors) => blockedActors !== actor
        ),
      };
    })
  ),
});
