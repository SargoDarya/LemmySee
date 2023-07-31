import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, OnInitEffects} from "@ngrx/effects";
import {AppActions} from "../../../../../apps/lemmy-gallery/src/app/+state/app.actions";
import {mergeMap, take} from "rxjs";
import {
  blockedActorsSelector,
  savedPostsSelector,
  userVisitedCommunitiesSelector
} from "../../../../../apps/lemmy-gallery/src/app/+state/app.selectors";
import {PersistenceKey, PersistenceService} from "persistence";
import {Action, Store} from "@ngrx/store";
import {CommunityView, PostView} from "lemmy-js-client";
import {LemmyService} from "../../../../../apps/lemmy-gallery/src/app/services/lemmy.service";

@Injectable()
export class PersistenceEffects implements OnInitEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly persistence: PersistenceService,
    private readonly store: Store,
    private readonly client: LemmyService
  ) {
  }

  public ngrxOnInitEffects(): Action {
    const blockedActors = this.persistence.load<string[]>(PersistenceKey.BlockedActors, []);
    const savedPosts = this.persistence.load<PostView[]>(PersistenceKey.SavedPosts, []);
    const recentCommunities = <CommunityView[]>this.persistence.load(PersistenceKey.MyCommunities, []);
    const jwt = this.persistence.load<string>(PersistenceKey.JWT, '');

    this.client.jwt = jwt;

    return AppActions.loadSavedState({
      blockedActors, savedPosts, recentCommunities, jwt
    });
  }

  persistRecentCommunities$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.selectCommunity),
        mergeMap(() =>
          this.store.select(userVisitedCommunitiesSelector).pipe(take(1))
        ),
        this.persistence.tapSave(PersistenceKey.MyCommunities)
      ),
    {dispatch: false}
  );

  persistBlockedActors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.blockActor),
        mergeMap(() =>
          this.store.select(blockedActorsSelector).pipe(take(1))
        ),
        this.persistence.tapSave(PersistenceKey.BlockedActors)
      ),
    {dispatch: false}
  );

  persistSavedPosts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.savePost),
        mergeMap(() =>
          this.store
            .select(savedPostsSelector)
            .pipe(take(1), this.persistence.tapSave(PersistenceKey.SavedPosts))
        )
      ),
    {dispatch: false}
  );
}
