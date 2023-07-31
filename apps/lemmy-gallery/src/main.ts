import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {AppEffects} from './app/+state/app.effects';
import {appFeature} from './app/+state/app.reducer';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {PersistenceEffects} from "persistence";

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
    provideState(appFeature),
    provideEffects(AppEffects, PersistenceEffects),
    provideStoreDevtools({name: 'LemmeSee'}),
  ],
});
