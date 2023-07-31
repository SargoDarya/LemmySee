import { Injectable } from '@angular/core';
import { CommunityView, LemmyHttp, Login, SortType } from 'lemmy-js-client';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Injectable({
  providedIn: 'root',
})
export class LemmyService {
  private baseUrl = 'https://lemmy.world';
  public client: LemmyHttp;
  private authToken?: string;

  public constructor() {
    this.client = new LemmyHttp(this.baseUrl);
  }

  public set jwt(jwt: string) {
    this.authToken = jwt;
  }

  public get isLoggedIn() {
    return !!this.authToken;
  }

  public login(username_or_email: string, password: string) {
    const login: Login = {
      username_or_email,
      password,
    };
    return this.client.login(login);
  }

  public searchCommunity(searchString: string) {
    return fromPromise(
      this.client.search({
        auth: this.authToken || undefined,
        q: searchString,
        type_: 'Communities',
        listing_type: 'All',
        sort: 'TopYear',
        limit: 50,
      })
    );
  }

  public getPosts(
    communityView: CommunityView,
    page = 0,
    sort: SortType = 'Hot'
  ) {
    return fromPromise(
      this.client.getPosts({
        auth: this.authToken || undefined,
        community_id: communityView.community.id,
        limit: 20,
        page,
        sort,
      })
    );
  }
}
