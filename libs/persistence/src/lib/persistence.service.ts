import {Injectable} from '@angular/core';
import {tap} from 'rxjs';
import {PersistenceKey} from "./persistence-keys";

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  public load<T>(persistenceKey: PersistenceKey, fallback: T | T[]): T {
    const result = localStorage.getItem(persistenceKey);
    return result ? JSON.parse(result) : fallback;
  }

  public save<T>(persistenceKey: PersistenceKey, payload: T) {
    localStorage.setItem(persistenceKey, JSON.stringify(payload));
  }

  public tapSave<T>(persistenceKey: PersistenceKey) {
    return tap((payload: T) => this.save(persistenceKey, payload));
  }
}
