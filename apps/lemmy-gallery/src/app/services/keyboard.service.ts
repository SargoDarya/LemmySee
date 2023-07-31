import { Injectable } from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';

export enum ActionEvent {
  NoOp,
  PostPrevious,
  PostNext,
  PostSave,
  AlbumImagePrevious,
  AlbumImageNext,
  BlockActor,
}

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  private readonly KeyboardToActionMap: Record<string, ActionEvent> = {
    q: ActionEvent.AlbumImagePrevious,
    e: ActionEvent.AlbumImageNext,
    a: ActionEvent.PostPrevious,
    d: ActionEvent.PostNext,
    s: ActionEvent.PostSave,
    b: ActionEvent.BlockActor,
  };

  public keyboardEvents$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    filter((event) => event.target === document.body),
    map((event) => event.key)
  );

  public postNavigation$ = this.keyboardEvents$.pipe(
    map((key) => {
      switch (key) {
        case 'd':
        case 'ArrowRight':
          return +1;

        case 'a':
        case 'ArrowLeft':
          return -1;
      }
      return 0;
    }),
    filter((num) => num !== 0)
  );

  public albumNavigation$ = this.keyboardEvents$.pipe(
    map((key) => {
      switch (key) {
        case 'e':
        case 'ArrowRight':
          return +1;

        case 'q':
        case 'ArrowLeft':
          return -1;
      }
      return 0;
    }),
    filter((num) => num !== 0)
  );

  public actions$ = this.keyboardEvents$.pipe(
    map((key): ActionEvent => {
      const actionMap = this.KeyboardToActionMap[key];
      return actionMap ? actionMap : ActionEvent.NoOp;
    }),
    filter((v) => v !== ActionEvent.NoOp)
  );

  public onAction(onlyAction: ActionEvent) {
    return this.actions$.pipe(filter((action) => action === onlyAction));
  }
}
