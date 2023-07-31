import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, combineLatest, filter, map, mergeMap, of, switchMap, take,} from 'rxjs';
import {LemmyService} from '../services/lemmy.service';
import {AppActions} from './app.actions';
import {Store} from '@ngrx/store';
import {
  currentPageIndexSelector,
  needsMorePostsSelector,
  selectedCommunitySelector,
  sortTypeSelector,
} from './app.selectors';
import {CommunityView, SortType} from 'lemmy-js-client';
import {PersistenceService} from "persistence";

@Injectable()
export class AppEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly lemmy: LemmyService,
    private readonly persistence: PersistenceService
  ) {
  }

  // login$ = createEffect(() => {
  //   this.actions$.pipe()
  // });

  loadSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.search),
      switchMap((action) =>
        this.lemmy.searchCommunity(action.searchTerm).pipe(
          map((response) => AppActions.searchSuccess(response)),
          catchError((err) => of(AppActions.searchFailed()))
        )
      )
    )
  );

  loadNextPagePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppActions.navigate,
        AppActions.selectCommunity,
        AppActions.selectSortType,
        AppActions.selectPostFilterType
      ),
      mergeMap(() => this.store.select(needsMorePostsSelector).pipe(take(1))),
      filter((needsMorePosts) => needsMorePosts),
      switchMap(() =>
        combineLatest([
          this.store.select(selectedCommunitySelector),
          this.store.select(currentPageIndexSelector),
          this.store.select(sortTypeSelector),
        ]).pipe(
          take(1),
          switchMap(([selectedCommunity, currentPage, sortType]) =>
            this.loadPostsFromCommunity(
              selectedCommunity!,
              currentPage + 1,
              sortType
            )
          )
        )
      )
    )
  );

  private loadPostsFromCommunity(
    community: CommunityView,
    page = 0,
    sortType: SortType = 'Hot'
  ) {
    return this.lemmy.getPosts(community, page, sortType).pipe(
      map((response) => AppActions.loadPostsSuccess({response, page})),
      catchError((err) => of(AppActions.loadPostsFailed()))
    );
  }
}
